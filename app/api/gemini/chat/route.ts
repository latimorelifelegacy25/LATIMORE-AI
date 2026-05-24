import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { message, history, data } = await req.json();

    if (!message || !data) {
      return NextResponse.json(
        { error: "Missing prompt or workspace data context." },
        { status: 400 }
      );
    }

    const dataContext = JSON.stringify(data);

    // Build standard multi-turn system instruction context
    const preamble = `
You are Latimore Life & Legacy Assistant, an intelligent, personal counselor that is deeply integrated into the user's active life workspace databases.
Your job is to answer questions, run analytics, run statistics, and provide planning and recommendations based on the user's real-time trackers.

USER DATABASES STATE:
- Finances: ${JSON.stringify(data.finances || [])}
- Health Metrics: ${JSON.stringify(data.health || [])}
- Goals: ${JSON.stringify(data.goals || [])}

GUIDELINES FOR CHATTING:
1. Always reference actual tracker items, dates, values, and costs to make answers hyper-personal and factual.
2. If they ask about correlation, walk them through the numbers. (e.g. "On 2026-05-18, you logged 7.5hr of sleep, and your workout was logged at 1.5hr. This corresponds to high energy....").
3. Make recommendations highly actionable. Avoid generic fluff. Keep replies structured and clear.
4. Keep answers brief, elegant, and directly addresses the query. Avoid walls of text. Be motivating and friendly.
`;

    // Map conversation history to the standard Gemini structure
    // history structure should be [{ role: "user" | "model", parts: [{ text: "..." }] }]
    const formattedContents = [];

    if (history && Array.isArray(history)) {
      for (const turn of history) {
        formattedContents.push({
          role: turn.role,
          parts: [{ text: turn.content }],
        });
      }
    }

    // Add current user prompt
    formattedContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: preamble,
        temperature: 0.7,
      },
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process chat query." },
      { status: 500 }
    );
  }
}
