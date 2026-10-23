import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyAdminRequest } from "@/lib/admin-auth";
import { isFirestoreConfigured, seedStarterContent } from "@/lib/firestore-server";

export const dynamic = "force-dynamic";

// POST - copy the starter projects and article into Firestore so they become editable
export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isFirestoreConfigured()) {
    return NextResponse.json(
      { error: "Firestore is not configured on this server (FIREBASE_SERVICE_ACCOUNT_KEY is missing)." },
      { status: 503 },
    );
  }
  try {
    const result = await seedStarterContent();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to import";
    console.error("[POST /api/admin/seed]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
