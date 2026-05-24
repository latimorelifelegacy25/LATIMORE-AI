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
    const { nodeId, nodeLabel, prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided for node execution" }, { status: 400 });
    }

    const systemInstruction = `
You are the AutoLoop Curricular and SEO Automation Engine.
Your mission is to generate elite, professional, engaging course materials and companion marketing assets.
Adhere strictly to the requested formats: tables, lists, markdown sections, or FAQ blocks wherever specified.
Ensure varied, natural human phrasing, deep practical value, and impeccable visual presentation inside Markdown.
Do not talk about policies, guardrails, or your internal reasoning processes. Answer directly.
`;

    // Package the payload. To ensure continuity, we can pass previous context as system context if provided
    let finalPrompt = prompt;
    if (context && context.trim().length > 0) {
      finalPrompt = `
PREV_COHESIVE_CONTEXT (Use this for continuity and matching references):
${context}

Active Task To Complete:
${prompt}
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      success: true,
      text: response.text,
      nodeId,
      nodeLabel,
    });

  } catch (error: any) {
    console.error("AutoLoop Generator Node Execution Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during node execution." },
      { status: 500 }
    );
  }
}
