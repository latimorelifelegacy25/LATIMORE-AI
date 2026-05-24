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
    const { platformMetrics, topPosts, baselineComparison } = await req.json();

    const systemPrompt = `
You are the Chief Digital Lead Officer at Latimore Life & Legacy LLC.
Your duty is to review the current social reach, click conversions, and engagement database logs, and provide elite HubSpot-like predictive insights.

Your advice should show deep understanding of local life, health, and retirement planning. Jackson M. Latimore Sr. relies on your recommendations to run his agency and allocate his advertising spend across Schuylkill, Luzerne, and Northumberland counties.

Categories of insight types:
- "Spike" (unusually high engagement on a topic or post)
- "Drop" (underperforming channel requiring refresh)
- "Opportunity" (growing interest in a key category like IUL early liquidity, executive bonus, or annuity minimization)
- "Compliance Alert" (warning about risky comments or captions)

Format instructions: Return a list of high-value insights matching the JSON schema. Be highly descriptive and actionable. Do not output markdown, output valid JSON.
`;

    const userPrompt = `
CURRENT ENGAGEMENT AND SOCIAL PERFORMANCE DATA:
Metrics: ${JSON.stringify(platformMetrics)}
Top Performing Materials: ${JSON.stringify(topPosts)}
Weekly Comparison Changes: ${JSON.stringify(baselineComparison)}

Provide exactly 3 to 4 premium, highly contextual marketing & conversion insights.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "Unique string id" },
              type: { type: Type.STRING, description: "Spike, Drop, Opportunity, or Alert" },
              severity: { type: Type.STRING, description: "high, medium, or low" },
              title: { type: Type.STRING, description: "Short, punchy title." },
              summary: { type: Type.STRING, description: "Analysis explaining exactly what happened and why it matters." },
              action: { type: Type.STRING, description: "Concrete recommendation for Jackson's marketing team to execute immediately." },
            },
            required: ["id", "type", "severity", "title", "summary", "action"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response returned from insights engine.");
    }

    const parsed = JSON.parse(text.trim());
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Generate Insights API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate engagement insights." },
      { status: 500 }
    );
  }
}
