/* Generate art using Gemini AI API */
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";


/* Get an intsance of Google Gemini AI API client */
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});


export async function POST(req) {
  try {
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
        // responseModalities: ["Text", "Image"], /* allows the model to respond with text or image */

        /* For now I only want the model to respond with images */
        responseModalities: ["Image"],
      },
    });

    // TODO: check this to make sure it works well
    /* Return the generated image */
    return new Response(response.contents[0].parts.inlineData.data, {
      headers: {
        "Content-Type": "image/png",
      },
    });

  }
  catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

