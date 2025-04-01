/* Purpose: route to handle the fetching of data from the supabase
 * database to be displayed in the gallery */

import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";



export async function GET(req, { params }) {
  const supabase = await createClient();

  /* Get the category from the params - link */
  const category = await params.category;
  
  /* Get all the artworks data for this specifc category and in
   * descending order to ensure the newest artworks show first: */
  const { data, error } = await supabase
   .from("artworks")
   .select("*") /* select all columns */
   .eq("artCategory", category) /* filter by category */
   .order("created_at", { ascending: false })

  /* Error handling */
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  /* Return all the artworks */
  return NextResponse.json({ artworks: data });
  
}