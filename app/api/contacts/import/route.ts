// app/api/contacts/import/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, PipelineStage, ConsentStatus } from "@prisma/client";

const prisma = new PrismaClient();

// Helper to normalize Pipeline Stages safely from CSV strings
function parsePipelineStage(stageStr: string): PipelineStage {
  const normalized = (stageStr || "").trim().toLowerCase().replace(/[\s-_]+/g, "_");
  
  if (normalized.includes("contacted")) {
    return PipelineStage.Contacted;
  }
  if (normalized.includes("booked") || normalized.includes("call")) {
    return PipelineStage.Booked_Call;
  }
  if (normalized.includes("discovery")) {
    return PipelineStage.Discovery_Complete;
  }
  if (normalized.includes("options") || normalized.includes("presented")) {
    return PipelineStage.Options_Presented;
  }
  if (normalized.includes("app") || normalized.includes("submit")) {
    return PipelineStage.App_Submitted;
  }
  if (normalized.includes("underwriting")) {
    return PipelineStage.Underwriting;
  }
  if (normalized.includes("issued") || normalized.includes("delivered")) {
    return PipelineStage.Issued_Delivered;
  }
  if (normalized.includes("force") || normalized.includes("review")) {
    return PipelineStage.In_Force_Review;
  }
  if (normalized.includes("lost") || normalized.includes("proceed")) {
    return PipelineStage.Lost_Not_Proceeding;
  }
  
  return PipelineStage.New;
}

// Helper to normalize Consent statuses
function parseConsentStatus(consentStr: string): ConsentStatus {
  const normalized = (consentStr || "").trim().toLowerCase();
  if (["opted_in", "opted-in", "optin", "yes", "true", "y", "1"].includes(normalized)) {
    return ConsentStatus.opted_in;
  }
  if (["opted_out", "opted-out", "optout", "no", "false", "n", "0"].includes(normalized)) {
    return ConsentStatus.opted_out;
  }
  return ConsentStatus.unknown;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const { contacts } = rawBody;

    if (!contacts || !Array.isArray(contacts)) {
      return NextResponse.json({ error: "Invalid payload. 'contacts' must be an array." }, { status: 400 });
    }

    const normalizedContacts = contacts
      .filter((c: any) => c && typeof c === "object" && c.name && String(c.name).trim())
      .map((c: any) => {
        const smsConsent = parseConsentStatus(c.smsConsentStatus || c.smsConsent);
        const emailConsent = parseConsentStatus(c.emailConsentStatus || c.emailConsent);

        return {
          name: String(c.name).trim(),
          email: c.email ? String(c.email).trim() : null,
          phone: c.phone ? String(c.phone).trim() : null,
          notes: c.notes ? String(c.notes).trim() : null,
          stage: parsePipelineStage(c.stage),
          smsConsentStatus: smsConsent,
          emailConsentStatus: emailConsent,
          smsOptInAt: smsConsent === ConsentStatus.opted_in ? new Date() : null,
          smsOptOutAt: smsConsent === ConsentStatus.opted_out ? new Date() : null,
          emailOptOutAt: emailConsent === ConsentStatus.opted_out ? new Date() : null,
        };
      });

    if (normalizedContacts.length === 0) {
      return NextResponse.json({ error: "No valid contacts with a non-empty 'name' field were found." }, { status: 400 });
    }

    // Use Prisma createMany to transaction-safety insert multiple rows
    const result = await prisma.contact.createMany({
      data: normalizedContacts,
    });

    return NextResponse.json({
      success: true,
      count: result.count,
      message: `Successfully imported ${result.count} contacts to Latimore life & legacy pipeline.`,
    });

  } catch (error: any) {
    console.error("Batch import failed:", error);
    return NextResponse.json({ error: "Failed to parse or batch import contact records. Underling database returned format issues." }, { status: 500 });
  }
}
