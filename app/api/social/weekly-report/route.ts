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
    const { kpis, sentimentTrend, topTopics, activeCampaign } = await req.json();

    const systemPrompt = `
You are the Senior Compliance and Analytics Director at Latimore Life & Legacy LLC.
Jackson M. Latimore Sr., Founder & CEO, requires a comprehensive weekly executive briefing report to align his local sales team and confirm the agency's messaging complies with insurance guidelines.

Provide an authoritative, detailed, motivational analysis across Facebook, Instagram, LinkedIn, and the website, with special focus on recruiting new advisors and finding premium cases (e.g. business buy-sells, IUL college funding, pension max).

Keep in mind his AED legacy story (#TheBeatGoesOn) which was established following his cardiac arrest survival on December 7, 2010.

Format instructions: Return a valid JSON object matching the requested schema. Ensure the description fields are long, expressive, and packed with strategies. Do not format inside the JSON as markdown blocks; write clean, raw JSON output.
`;

    const userPrompt = `
WEEK ENGAGEMENT BASELINE METRICS:
KPI score totals: ${JSON.stringify(kpis)}
Audit sentiment mix: ${JSON.stringify(sentimentTrend)}
Current customer hot topics: ${JSON.stringify(topTopics)}
Underway focus campaign: ${JSON.stringify(activeCampaign)}

Generate a premium weekly report detailing channel performance, regional feedback, growth hacks, and strict compliance assessments.
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
            reportingPeriod: { type: Type.STRING, description: "e.g., May 21, 2026 - May 28, 2026" },
            executiveSummary: { type: Type.STRING, description: "High-level description of overall marketing reach, conversions, and agency morale." },
            facebookPerformance: { type: Type.STRING, description: "Analysis of Facebook family coverage reach, local PA group activities, and metrics." },
            instagramPerformance: { type: Type.STRING, description: "Analysis on millennial mortgage protection imagery and Instagram stories." },
            linkedinPerformance: { type: Type.STRING, description: "Analysis on recruitment of local agents, business Buy-Sells, and split-dollar plans." },
            websiteEmailPerformance: { type: Type.STRING, description: "Main GA4 property analysis (G-S0Q3E4DEBJ), form conversions, and CTA clicks." },
            topTopicsAnalysis: { type: Type.STRING, description: "Detailed exploration of what topics (like emergency reserves liquidity, cardiac legacy) triggered the most leads." },
            complianceAuditRating: { type: Type.STRING, description: "A rating (e.g., 'A - Strict Compliance Maintained') and assessment of regulatory safety." },
            regulatoryNotes: { type: Type.STRING, description: "Notes detailing how to safeguard indexed illustrations, bonus multipliers, or tax-advantaged disclaimers." },
            recommendedDirectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 to 5 critical action directives for the coming week to maximize local ROI.",
            },
          },
          required: [
            "reportingPeriod",
            "executiveSummary",
            "facebookPerformance",
            "instagramPerformance",
            "linkedinPerformance",
            "websiteEmailPerformance",
            "topTopicsAnalysis",
            "complianceAuditRating",
            "regulatoryNotes",
            "recommendedDirectives",
          ],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Weekly report could not be generated.");
    }

    const parsed = JSON.parse(text.trim());
    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Generate Weekly Report API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate weekly reporting summary." },
      { status: 500 }
    );
  }
}
