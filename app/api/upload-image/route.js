import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  const formData = await req.formData();
  const file = formData.get("file");
  const fileName = formData.get("fileName");

  /* Error check */
  if (!file || !fileName) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  /* Upload the image to the storage bucket */
  const { data, error } = await supabase.storage
    .from("artwork-images")
    .upload(fileName, file, {
      contentType: file.type,
    });

  /* Error check */
  if (error) {
    console.error("Upload error: ", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  /* Get the public url for the image */
  const { data: publicUrlData } = supabase.storage
    .from("artwork-images")
    .getPublicUrl(fileName);

  /* Return image URL string */
  return Response.json({ imageUrl: publicUrlData.publicUrl });
}