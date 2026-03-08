import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminRequest } from "@/lib/admin-auth";

function getRequiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} environment variable is not set`);
  }
  return value;
}

function getBucketName(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_BUCKET?.trim() || "portfolio-images";
}

function getFileExtension(file: File): string {
  const nameParts = file.name.split(".");
  const extension = nameParts.length > 1 ? nameParts.pop() : undefined;
  return extension ? extension.toLowerCase() : "bin";
}

function isValidSupabaseUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabaseUrl = getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL");
    const serviceRoleKey = getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY");

    if (!isValidSupabaseUrl(supabaseUrl)) {
      return NextResponse.json(
        { error: "Invalid NEXT_PUBLIC_SUPABASE_URL: must be a valid HTTP/HTTPS URL" },
        { status: 500 },
      );
    }

    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Image file is required" }, { status: 400 });
    }

    const bucket = getBucketName();
    const extension = getFileExtension(file);
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${extension}`;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error: uploadError } = await supabase.storage.from(bucket).upload(fileName, file, {
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

    if (uploadError) {
      if (uploadError.message.toLowerCase().includes("bucket not found")) {
        return NextResponse.json(
          {
            error: `Supabase bucket not found: \"${bucket}\". Create this bucket in Supabase Storage or set NEXT_PUBLIC_SUPABASE_BUCKET correctly.`,
          },
          { status: 400 },
        );
      }
      return NextResponse.json({ error: uploadError.message }, { status: 400 });
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    if (!data?.publicUrl) {
      return NextResponse.json({ error: "Failed to resolve public URL" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl: data.publicUrl }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
