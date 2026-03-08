type LimitDecision = {
  blocked: boolean;
  retryAfterSec?: number;
};

interface LoginRateLimiterOptions {
  maxAttempts: number;
  windowSec: number;
  blockSec: number;
  keyPrefix?: string;
}

type MemoryState = {
  count: number;
  windowStartMs: number;
  blockedUntilMs?: number;
};

const memoryState = new Map<string, MemoryState>();

function getRedisConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function redisCommand(args: string[]): Promise<unknown | null> {
  const config = getRedisConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([args]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis HTTP ${response.status}`);
  }

  const data = (await response.json()) as Array<{ result?: unknown }>;
  return data[0]?.result ?? null;
}

async function redisGetString(key: string): Promise<string | null> {
  const result = await redisCommand(["GET", key]);
  return typeof result === "string" ? result : null;
}

async function redisDel(key: string): Promise<void> {
  await redisCommand(["DEL", key]);
}

async function redisIncrWithWindow(key: string, windowSec: number): Promise<number | null> {
  const config = getRedisConfig();
  if (!config) return null;

  const response = await fetch(`${config.url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", key],
      ["TTL", key],
    ]),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis HTTP ${response.status}`);
  }

  const data = (await response.json()) as Array<{ result?: unknown }>;
  const count = Number(data[0]?.result ?? 0);
  const ttl = Number(data[1]?.result ?? -1);

  if (ttl < 0) {
    await redisCommand(["EXPIRE", key, String(windowSec)]);
  }

  return Number.isFinite(count) ? count : null;
}

async function redisSetBlock(key: string, blockSec: number): Promise<void> {
  await redisCommand(["SET", key, String(Date.now() + blockSec * 1000), "EX", String(blockSec)]);
}

function getMemoryDecision(key: string): LimitDecision {
  const now = Date.now();
  const current = memoryState.get(key);
  if (!current) return { blocked: false };

  if (current.blockedUntilMs && current.blockedUntilMs > now) {
    return {
      blocked: true,
      retryAfterSec: Math.ceil((current.blockedUntilMs - now) / 1000),
    };
  }

  return { blocked: false };
}

function registerMemoryFailure(key: string, options: LoginRateLimiterOptions): void {
  const now = Date.now();
  const current = memoryState.get(key);

  if (!current || now - current.windowStartMs > options.windowSec * 1000) {
    memoryState.set(key, {
      count: 1,
      windowStartMs: now,
    });
    return;
  }

  const count = current.count + 1;
  memoryState.set(key, {
    count,
    windowStartMs: current.windowStartMs,
    blockedUntilMs: count >= options.maxAttempts ? now + options.blockSec * 1000 : undefined,
  });
}

function clearMemoryState(key: string): void {
  memoryState.delete(key);
}

export function createLoginRateLimiter(options: LoginRateLimiterOptions) {
  const prefix = options.keyPrefix || "admin:auth";

  const attemptsKey = (key: string) => `${prefix}:${key}:attempts`;
  const blockedKey = (key: string) => `${prefix}:${key}:blocked`;

  return {
    async check(key: string): Promise<LimitDecision> {
      try {
        const blockValue = await redisGetString(blockedKey(key));
        if (!blockValue) return getMemoryDecision(key);

        const blockedUntilMs = Number(blockValue);
        if (Number.isNaN(blockedUntilMs) || blockedUntilMs <= Date.now()) {
          await redisDel(blockedKey(key));
          return getMemoryDecision(key);
        }

        return {
          blocked: true,
          retryAfterSec: Math.ceil((blockedUntilMs - Date.now()) / 1000),
        };
      } catch {
        return getMemoryDecision(key);
      }
    },

    async registerFailure(key: string): Promise<void> {
      try {
        const count = await redisIncrWithWindow(attemptsKey(key), options.windowSec);
        if (count === null) {
          registerMemoryFailure(key, options);
          return;
        }
        if (count !== null && count >= options.maxAttempts) {
          await redisSetBlock(blockedKey(key), options.blockSec);
        }
      } catch {
        registerMemoryFailure(key, options);
      }
    },

    async clear(key: string): Promise<void> {
      try {
        await Promise.all([
          redisDel(attemptsKey(key)),
          redisDel(blockedKey(key)),
        ]);
      } catch {
        clearMemoryState(key);
      }
      clearMemoryState(key);
    },
  };
}
