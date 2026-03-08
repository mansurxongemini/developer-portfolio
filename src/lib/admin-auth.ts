import type { NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is not set`);
  }
  return value;
}

export function getAdminCredentials() {
  return {
    email: getRequiredEnv("ADMIN_EMAIL"),
    password: getRequiredEnv("ADMIN_PASSWORD"),
  };
}

export function getAdminJwtSecret(): Uint8Array {
  const password = getRequiredEnv("ADMIN_PASSWORD");
  return new TextEncoder().encode(password);
}

export async function verifyAdminRequest(request: NextRequest): Promise<boolean> {
  try {
    const token = request.cookies.get("admin_token")?.value;
    if (!token) return false;

    const secret = getAdminJwtSecret();
    const { payload } = await jwtVerify(token, secret);

    const role = (payload as JWTPayload & { role?: string }).role;
    const email = (payload as JWTPayload & { email?: string }).email;
    const adminEmail = getRequiredEnv("ADMIN_EMAIL");

    return role === "admin" && email === adminEmail;
  } catch {
    return false;
  }
}
