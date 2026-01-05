
import { GoogleGenAI, Type } from "@google/genai";

// Ensure the API Key is available
const API_KEY = process.env.API_KEY;

export async function getFitAdvice(productTitle: string, userDetails: string): Promise<string> {
  if (!API_KEY) return "AI Assistant unavailable. Please refer to our size guide.";

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `User is looking at the ${productTitle}. Their details: ${userDetails}. 
      Give a concise, editorial-style advice (max 2 sentences) on which size they should pick or how the garment will feel on them. 
      Keep the tone calm, professional, and minimal. Do not use exclamation marks.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Selection based on your preference is recommended.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to the Fit Assistant. Please try again.";
  }
}
