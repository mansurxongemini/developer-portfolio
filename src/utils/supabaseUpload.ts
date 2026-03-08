function getFileExtension(file: File): string {
  const nameParts = file.name.split(".");
  const extension = nameParts.length > 1 ? nameParts.pop() : undefined;
  return extension ? extension.toLowerCase() : "bin";
}

export async function supabaseUpload(file: File): Promise<string> {
  const formData = new FormData();
  const extension = getFileExtension(file);
  const normalizedFile =
    extension && !file.name.toLowerCase().endsWith(`.${extension}`)
      ? new File([file], `${file.name}.${extension}`, { type: file.type })
      : file;
  formData.append("image", normalizedFile);

  const response = await fetch("/api/admin/upload-supabase", {
    method: "POST",
    body: formData,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || "Failed to upload image");
  }

  if (!payload?.imageUrl) {
    throw new Error("Failed to resolve Supabase public URL");
  }

  return payload.imageUrl as string;
}
