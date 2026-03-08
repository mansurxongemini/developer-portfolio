import { NextResponse } from "next/server";
import { getPublishedProjects } from "@/lib/firestore-server";

// GET - Fetch published projects (public, no auth)
export async function GET() {
  try {
    const projects = await getPublishedProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch projects";
    console.error("[GET /api/content/projects]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
