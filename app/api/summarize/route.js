import { NextResponse } from "next/server";
import xss from "xss";
import { z } from "zod";

const summarizeSchema = z.object({
  content: z
    .string()
    .min(100, "Content must at least 1000 character long.")
    .max(20000, "Content cannot exceed 20000 characters."),
});

export async function POST(req) {
  try {
    const rawData = await req.json();
    const validatedData = summarizeSchema.parse(rawData);

    const sanitizedContent = xss(validatedData.content);

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const userPrompt = `Summarize the following text into 5-6 concise bullet points. The text is about a cybersecurity topic. Ensure the points capture the key aspects of the text.
    \n\nText: "${sanitizedContent}"`;

    const payload = {
      contents: [{ parts: [{ text: userPrompt }] }],
      tools: [{ google_search: {} }],
      systemInstruction: {
        parts: [{ text: "Act as a cybersecurity analyst." }],
      },
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error("Failed to generate summary from Gemini API.");
    }

    const result = await response.json();
    const generatedText =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const bulletPoints = generatedText
      .split("\n")
      .filter((line) => line.startsWith("* "))
      .map((line) => line.substring(2));

    return NextResponse.json({ summary: bulletPoints }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", issues: error.issues },
        { status: 400 }
      );
    }
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}
