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
    const {
      documentId,
      documentTitle,
      documentText,
      contentType,
      topic,
      targetAudience,
      selectedTone,
      additionalPrompt,
    } = await req.json();

    if (!contentType || !topic) {
      return NextResponse.json(
        { error: "Missing campaign content type or topic." },
        { status: 400 }
      );
    }

    // Comprehensive expert insurance product knowledge from uploaded PDFs preloaded
    const expertKnowledgeContext = `
EXPERT NORTH AMERICAN INSURANCE & MARKETING SOLUTIONS DISCLOSURE GUIDE:

1. PRODUCT PORTFOLIO:
- ADDvantage® Term: Level premium guarantee periods (10, 15, 20, 30 years). Minimum face value $100,000. Annual policy fee $65. High convertibility and broad market appeal. Offers ADBE (Accelerated Death Benefit Endorsement) for critical, chronic, and terminal illness.
- Protection Builder IUL® 2: High death benefit guarantee duration with strong cash value build. Optional PGR (Premium Guarantee Rider) extends No-Lapse protection up to age 120. Fidelity Multifactor Yield Index 5% ER (with 1% current interest bonus). 15-year surrender period.
- Builder Plus IUL® 4: For high cash value growth potential and supplemental tax-advantaged retirement income. Features index interest bonuses, variable/fixed policy loans available in year 3, and a 10-year surrender charge period.
- Smart Builder® IUL 3: Designed for early liquidity and access to potential cash value. Offers a Waiver of Surrender Charge Option (WOSC) Rider which features 0% premium load and 0% surrender charge if selected. 10% penalty-free withdrawal starting in year 2.

2. BUSINESS & FINANCIAL SALES SOLUTIONS ROADMAP:
- Annuity Maximization: Moving unneeded annuity funds into tax-free, leveraged life insurance death benefits for beneficiaries while retaining potential cash access.
- Buy-Sell Agreements: Protecting business transitions against partner death/disability using life insurance funding (Entity Purchase or Cross-Purchase).
- Executive Bonus (S162): Employer-funded life insurance policies owned by key employees, serving to recruit, reward, and retain leaders. Deductible to business, taxable to executive.
- Key Person: Mitigates financial loss of a mission-critical employee (protects skill, sales, credit lines, replaces talent).
- Split Dollar Plans (Loan Regime or Endorsement): Splitting policy benefits between employer and key employee to reduce current tax drag and optimize executive retirement.
- College Funding: Growing cash values inside permanent IUL contract on primary earner to supplement or pay tuition tax-free.
- Estate Planning: Creating liquidity at death to pay estate/probate taxes, balancing family inheritance assets without forced liquidation of farms, businesses, or real estate.
- Income Protection: Safeguarding dependants from loss of breadwinner's earnings (calculating debt, ongoing expenses, college savings).
- Legacy Building: Leveraging idle assets (savings, RMDs, annuities) into a larger, guaranteed income tax-free legacy for children.
- Longevity Planning: grow cash values to defer "longevity risk" of living longer than expected.
- Pension Maximization: Using highest single-life pension payout tier for retiree while establishing IUL protection to supply income for the surviving spouse.
- Smart Money: Transferring safe "just in case" emergency reserves under a Smart Builder IUL to capture growth while retaining 100% early cash value access via WOSC.
`;

    // Tone definitions
    let toneDescription = "";
    if (selectedTone === "empathetic") {
      toneDescription = "Deeply empathetic, protective, family-centered, warmth-driven, emphasizing peace of mind and family security.";
    } else if (selectedTone === "authoritative") {
      toneDescription = "Highly professional, authoritative, analytical, corporate, emphasizing financial planning precision, tax-advantages, and corporate buyouts.";
    } else if (selectedTone === "local") {
      toneDescription = "Friendly, Central Pennsylvania neighborly, down-to-earth, emphasizing local trust across Schuylkill, Luzerne, and Northumberland counties, with occasional motivating references to local spirit and hard work.";
    } else {
      toneDescription = "Informative, educational, clear, accessible, helping consumer understand terminology without confusing sales fluff.";
    }

    // Format prompt
    const systemPrompt = `
You are the Latimore Life & Legacy Senior Content Strategy Specialist.
Your mission is to engineer high-converting, professional, compliant, and deeply engaging marketing and sales assets for Jackson M. Latimore Sr., Founder & CEO.
Jackson is based in Central Pennsylvania (serving Schuylkill, Luzerne, and Northumberland counties) and operates under the noble mission "#TheBeatGoesOn" — honoring his second chance at life given by an AED on Dec 7, 2010.

When generating content:
1. Always follow the highest ethical standards. Include a small compliance-friendly note or disclaimer in small text at the very end when mentioning indexes or tax-free features.
2. Ensure the copy is tailored to the specified Audience, Product/Topic, and Tone.
3. If the tone is 'Local', touch on Central Pennsylvania communities, local trust, or Schuylkill, Luzerne, Northumberland counties.
4. If applicable, reflect Jackson's dedication to protection, legacy, and securing families’ futures.

THE REFERENCE KNOWLEDGE BASE:
${expertKnowledgeContext}

${documentTitle ? `THE CURRENT CHOSEN USER DOCUMENT (${documentTitle}):\n${documentText}` : ""}
`;

    const userPrompt = `
Generate a professional marketing piece with the following parameters:
- **Campaign Asset Type**: ${contentType.toUpperCase()} (e.g. social media copy, client pitch email, blog/article post, presentation script).
- **Topic/Product Concept**: ${topic}
- **Target Audience**: ${targetAudience}
- **Tone Profile**: ${toneDescription}
${additionalPrompt ? `- **Extra User Instructions**: ${additionalPrompt}` : ""}

Please output the content in robust, clean, beautiful Markdown format. Use headers, bold text, bullet points, isles, and callouts to structure the copy so it looks breathtakingly premium. Make sure it contains:
1. A captivating display Hook (or Email Subject Line / Blog Title).
2. The core educational body copy that clarifies the core problem and how the Indexed Universal Life (IUL) or Term insurance solution addresses it.
3. Engaging bulleted takeaways/features.
4. A standard calls-to-action (CTA) inviting the prospect to connect with Jackson M. Latimore Sr. to configure their financial blueprint.
5. A brief compliance footer (noting that life insurance is subject to underwriting, interest bonuses are not guaranteed, etc.).
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text,
      contentType,
      topic,
      targetAudience,
      selectedTone,
    });
  } catch (error: any) {
    console.error("Content Creation API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create content campaign." },
      { status: 500 }
    );
  }
}
