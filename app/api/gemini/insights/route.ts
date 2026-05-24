import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client
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
    const body = await req.json();
    const { finances, health, goals } = body;

    if (!finances || !health || !goals) {
      return NextResponse.json(
        { error: "Incomplete database records provided." },
        { status: 400 }
      );
    }

    const dataContext = JSON.stringify({ finances, health, goals });

    const prompt = `
You are an elite productivity strategist, wellness advisor, and financial analyst combined. 
Analyze the user's interconnected life tracking databases below and generate premium, actionable cross-domain reports.

DATABASE STATE:
${dataContext}

INSTRUCTIONS:
Analyze:
1. Financial habits: highlight major income streams or categories where they are spending, and whether it supports their goals.
2. Health trends: highlight sleep average, exercise metrics, and comments.
3. Cross-domain correlations: identify exactly how different areas impact each other. For example:
   - Does spending on health/diet items trigger higher exercise sessions or better mood?
   - How are financial limitations or heavy spending impacting health ratings?
   - Do higher sleep ratings improve the execution of athletic goals?
   - Support with concrete data from the logs.
4. Action Items: Provide concrete, highly customized life recommendations mapped back to their defined goals.

Your response must strictly conform to the following JSON schema. Do not include markdown characters in the actual JSON fields, output valid JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            executiveSummary: {
              type: Type.STRING,
              description: "A motivating, summary of the current state of their personal growth trajectory.",
            },
            financialHabitsText: {
              type: Type.STRING,
              description: "Analysis of spending behavior, savings rate, and goal alignment.",
            },
            healthTrendsText: {
              type: Type.STRING,
              description: "Analysis of sleep, workouts, and general physical/mental energy correlations.",
            },
            interconnectedCorrelations: {
              type: Type.ARRAY,
              description: "Identified interaction effects between finances, health, and goals.",
              items: {
                type: Type.OBJECT,
                properties: {
                  type: {
                    type: Type.STRING,
                    description: "Domains involved, e.g., 'Health & Career', 'Finances & Goals', or 'Health & Sleep'.",
                  },
                  description: {
                    type: Type.STRING,
                    description: "Detailed description of the correlation and the data supporting it.",
                  },
                  impactLevel: {
                    type: Type.STRING,
                    description: "The estimated impact on their life: 'High', 'Medium', or 'Low'.",
                  },
                  metricComparison: {
                    type: Type.STRING,
                    description: "A short, readable correlation factor, e.g., 'Sleep vs Workout Quality' or 'Organic Eating vs Energy'.",
                  },
                },
                required: ["type", "description", "impactLevel", "metricComparison"],
              },
            },
            actionItems: {
              type: Type.ARRAY,
              description: "Practical action checklist items mapped to domains.",
              items: {
                type: Type.OBJECT,
                properties: {
                  domain: {
                    type: Type.STRING,
                    description: "Either 'Finance', 'Health', or 'Goals'.",
                  },
                  title: {
                    type: Type.STRING,
                    description: "Short title of the task.",
                  },
                  advice: {
                    type: Type.STRING,
                    description: "Actionable instructions on what they should change/do.",
                  },
                  difficulty: {
                    type: Type.STRING,
                    description: "How challenging this advice will be: 'Easy', 'Medium', or 'Hard'.",
                  },
                },
                required: ["domain", "title", "advice", "difficulty"],
              },
            },
          },
          required: [
            "executiveSummary",
            "financialHabitsText",
            "healthTrendsText",
            "interconnectedCorrelations",
            "actionItems",
          ],
        },
      },
    });

    const reportText = response.text;
    if (!reportText) {
      throw new Error("No response output returned from Gemini API.");
    }

    const parsedReport = JSON.parse(reportText.trim());
    return NextResponse.json(parsedReport);
  } catch (error: any) {
    console.error("Gemini Insights API Error:", error);
    return NextResponse.json(
      { error: error?.message || "An error occurred during AI content generation." },
      { status: 500 }
    );
  }
}
