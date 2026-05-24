import { GoogleGenAI, Type } from "@google/genai";
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
    const { commentBody, platform } = await req.json();

    if (!commentBody) {
      return NextResponse.json({ error: "Missing comment text to analyze" }, { status: 400 });
    }

    const systemPrompt = `
You are the Latimore Life & Legacy Compliance and Marketing Intelligence Router.
Your task is to analyze user comments, Direct Messages, or questions from social media (Facebook, Instagram, LinkedIn, or Website) and generate a clean audit analysis.

You must look for:
1. Sentiment: Is the feedback positive, neutral, negative, or mixed?
2. Intent: Is it a general question, complaint, praise, purchase interest, support request, etc.?
3. Urgency: How urgent is this for our Central PA office? (Low, Medium, High)
4. Topic tags: e.g. life insurance, retirement, annuities, AED legacy, Pottsville local trust, pricing.
5. Lead potential: If they represent a warm lead seeking a financial solution (High, Medium, Low).
6. Compliance risk: Check for compliance issues (e.g., misrepresentation of guaranteed interest, claims of guaranteed index returns, or severe complaints) (High, Medium, Low, None).
7. Recommended response action for Jackson M. Latimore Sr. to perform.
`;

    const userPrompt = `
Analyze this comment:
Platform: ${platform || "Unknown"}
Message content: "${commentBody}"

Return the analysis in strict compliance with the JSON schema.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              description: "Must be positive, neutral, negative, or mixed.",
            },
            confidence: {
              type: Type.NUMBER,
              description: "Confidence rating of the identification, from 0.0 to 1.0.",
            },
            intent: {
              type: Type.STRING,
              description: "Must be question, complaint, praise, purchase_interest, support_request, or other.",
            },
            urgency: {
              type: Type.STRING,
              description: "Must be low, medium, or high.",
            },
            topics: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key product or topic tags identified in the comment.",
            },
            lead_potential: {
              type: Type.STRING,
              description: "Must be low, medium, or high level.",
            },
            compliance_risk: {
              type: Type.STRING,
              description: "Must be none, low, medium, or high level.",
            },
            recommended_action: {
              type: Type.STRING,
              description: "A professional, compliance-friendly recommended course of action for our team.",
            },
          },
          required: [
            "sentiment",
            "confidence",
            "intent",
            "urgency",
            "topics",
            "lead_potential",
            "compliance_risk",
            "recommended_action",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No analysis returned from Gemini.");
    }

    const parsed = JSON.parse(text.trim());
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Sentiment Analysis API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze comment sentiment." },
      { status: 500 }
    );
  }
}
