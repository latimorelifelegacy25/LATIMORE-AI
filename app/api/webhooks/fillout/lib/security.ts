// lib/security.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path as needed
import crypto from "crypto";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

/**
 * Requires an active session matching an email in the ADMIN_EMAILS environment variable.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  
  const adminEmailsList = process.env.ADMIN_EMAILS || "";
  const allowed = adminEmailsList.split(',').map(e => e.trim().toLowerCase());

  if (!email || !allowed.includes(email)) {
    throw new UnauthorizedError("Admin access required.");
  }
  
  return { email };
}

/**
 * Requires a Bearer token matching the CRON_SECRET environment variable.
 */
export function requireCron(req: Request) {
  const expected = process.env.CRON_SECRET;
  const actual = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (!expected || actual !== expected) {
    throw new UnauthorizedError("Invalid or missing cron secret.");
  }
}

/**
 * Verifies the HMAC-SHA256 signature for incoming webhooks using timingSafeEqual to prevent timing attacks.
 */
export function requireHmacSignature(rawBody: string, signature: string, secret: string) {
  if (!signature || !secret) {
    throw new UnauthorizedError("Missing signature or secret.");
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');

  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length || !crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    throw new UnauthorizedError("Invalid webhook signature.");
  }
}
