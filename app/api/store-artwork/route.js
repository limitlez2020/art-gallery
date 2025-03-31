import { createClient } from "@/utils/supabase/server";

export async function POST(req) {
  const supabase = await createClient();
  /* Get the artwork data from the request body */
  const { title, artist, category, story, image_url } = await req.json();

  /* Error check */
  if (!title || !artist || !category || !story || !image_url) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  /* Insert these values to their respective columns in the database table: */
  const { data, error } = await supabase
  .from("artworks") /* database table name */
  .insert([
    {
      artworkName: title,
      artistName: artist,
      artCategory: category,
      artworkStory: story,
      imageURL: image_url,
    },
  ])
  .select();

  /* Handle errors: */
  if (error) {
    console.error("Error storing artwork and details in database: ", error.message);
    return null;
  }

  /* Check if the data exists - is stored in the database: */
  if (!data) {
    return Response.json({ error: "Failed to store artwork" }, { status: 500 });
  }
  
  /* If the data is stored, return a success message */
  return Response.json({ message: "Artwork stored successfully" }, { status: 201 });
}