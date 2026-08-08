import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message =
      typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY belum diatur." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const interaction = await ai.interactions.create({
      model: process.env.GEMINI_MODEL || "gemini-3.6-flash",
      input: message,
    });

    return NextResponse.json({
      text: interaction.output_text ?? "Tidak ada respons.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gemini request failed." },
      { status: 500 }
    );
  }
}
