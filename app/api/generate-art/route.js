/* Generate art using Gemini AI API */
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@/utils/supabase/server";


/* Get an intsance of Google Gemini AI API client */
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


export async function POST(req) {
  try {
    /* Create a supabase client - for storage of image generated */
    const supabase = await createClient();

    /* Get the prompt from the request body */
    const { prompt } = await req.json();

    /* Make sure prompt exists */
    if (!prompt) {
      return new Response({ error: "Prompt is missing " }, { status: 400 });
    }

    /* Generate art using Gemini AI API */
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp-image-generation",
      contents: prompt,
      config: {
        /* The diffrent modalities the model can return */
        responseModalities: ["Text", "Image"],
        /* Aspext ratio */
        aspectRatio: "16:9"
      },
    });


    /* Get the image data */
    const imageData = response.candidates[0].content.parts[0].inlineData.data

    /* Convert the base64 data to a blob - a file */
    const blob = Buffer.from(imageData, "base64")

    /* Create filename */
    const prompt_name = prompt.split(" ").slice(0, 3).join("-");
    const filename = `art-${Date.now()}-${prompt_name}.png`

    /* Upload generated image to supabase: */
    const { data: storageData, error: storageError } = await supabase.storage
      .from("artwork-images") /* storage bucket */
      .upload(filename, blob, {
        contentType: "image/png",
        upsert: false,
      });

    /* Handle errors: */
    if (storageError) {
      console.error("Storage Error: ", storageError);
      return NextResponse.json({ error: "Error uploading image to storage" }, { status: 500 });
    }

    /* Get public url of image from the storage */
    const { data: publicUrlData } = supabase.storage
      .from("artwork-images") /* storage bucket */
      .getPublicUrl(filename);

    /* Return image URL string */
    return Response.json({ imageUrl: publicUrlData.publicUrl });

  }
  catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

