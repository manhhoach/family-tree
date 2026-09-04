import { supabase } from "@/src/lib/supabase/client";

export async function uploadAvatar(file: File) {
  const extension = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw error;
  }
  const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

  return data.publicUrl;
}
