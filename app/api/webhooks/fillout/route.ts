// app/api/webhooks/fillout/route.ts
import { NextResponse } from 'next/server';
import { requireHmacSignature } from './lib/security';
import { PrismaClient } from '@prisma/client';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const prisma = new PrismaClient();

// Lazy initialization of Redis and Rate Limiter to prevent crashes when env keys are missing
let ratelimit: Ratelimit | null = null;

function getRateLimiter() {
  if (!ratelimit) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.REDIS_TOKEN;
    if (redisUrl && redisToken) {
      try {
        ratelimit = new Ratelimit({
          redis: Redis.fromEnv(),
          limiter: Ratelimit.slidingWindow(30, "1 m"),
        });
      } catch (err) {
        console.error("Failed to initialize Upstash Redis Rate Limiter:", err);
      }
    }
  }
  return ratelimit;
}

export async function POST(req: Request) {
  try {
    // 1. Enforce Rate Limiting based on IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limiter = getRateLimiter();
    
    if (limiter) {
      const { success } = await limiter.limit(`webhook_fillout:${ip}`);
      if (!success) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
      }
    } else {
      console.warn("Upstash Redis variables missing. Skipping active rate-limiting validation.");
    }

    // 2. Read raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('fillout-signature') || ''; // Adjust header name based on provider
    const secret = process.env.FILLOUT_WEBHOOK_SECRET || '';

    // 3. Verify HMAC Signature
    requireHmacSignature(rawBody, signature, secret);

    const payload = JSON.parse(rawBody);
    const providerEventId = payload.eventId; // Adjust based on provider's payload structure

    if (!providerEventId) {
      return NextResponse.json({ error: "Missing event ID in payload" }, { status: 400 });
    }

    // 4. Idempotency Check: Prevent duplicate webhooks
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: {
        provider_providerEventId: {
          provider: 'fillout',
          providerEventId: providerEventId,
        }
      }
    });

    if (existingEvent) {
      // Safely no-op if we've already seen this event
      return NextResponse.json({ success: true, message: "Event already processed" }, { status: 200 });
    }

    // 5. Log the incoming webhook as "received"
    const webhookRecord = await prisma.webhookEvent.create({
      data: {
        provider: 'fillout',
        providerEventId: providerEventId,
        eventType: payload.eventType || 'form_submission',
        payload: payload,
      }
    });

    // ---------------------------------------------------------
    // 6. Execute Business Logic (Normalize Lead, Create Contact, etc.)
    // INSERT LEAD INGESTION LOGIC HERE
    // ---------------------------------------------------------

    // 7. Mark as processed
    await prisma.webhookEvent.update({
      where: { id: webhookRecord.id },
      data: {
        status: "processed",
        processedAt: new Date(),
      }
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    if (error.name === 'UnauthorizedError') {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    
    console.error("Webhook processing failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
