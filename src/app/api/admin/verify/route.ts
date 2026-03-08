import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  try {
    const authenticated = await verifyAdminRequest(request);
    if (!authenticated) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
