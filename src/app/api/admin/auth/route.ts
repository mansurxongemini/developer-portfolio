import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SignJWT } from "jose";
import { getAdminCredentials, getAdminJwtSecret } from "@/lib/admin-auth";
import { createLoginRateLimiter } from "@/lib/distributed-rate-limit";

const rateLimiter = createLoginRateLimiter({
  maxAttempts: 5,
  windowSec: 10 * 60,
  blockSec: 15 * 60,
  keyPrefix: "admin:login",
});

function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function getRateLimitKey(request: NextRequest, email?: string): string {
  return `${getClientIp(request)}:${email || "unknown"}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const rateLimitKey = getRateLimitKey(request, email);
    const limit = await rateLimiter.check(rateLimitKey);
    if (limit.blocked) {
      return NextResponse.json(
        { error: "Too many login attempts. Try again later." },
        {
          status: 429,
          headers: limit.retryAfterSec
            ? { "Retry-After": String(limit.retryAfterSec) }
            : undefined,
        },
      );
    }

    const { email: adminEmail, password: adminPassword } = getAdminCredentials();
    const JWT_SECRET = getAdminJwtSecret();

    if (email !== adminEmail || password !== adminPassword) {
      await rateLimiter.registerFailure(rateLimitKey);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    await rateLimiter.clear(rateLimitKey);

    const token = await new SignJWT({ email, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .setIssuedAt()
      .sign(JWT_SECRET);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}
