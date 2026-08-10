import { cookies } from "next/headers";
import crypto from "crypto";

// Default admin credentials (can be overridden by environment variables)
export const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@paco2026";
export const SESSION_COOKIE_NAME = "admin_session";

// Simple HMAC token creation for single-admin session validation
const SECRET_KEY = process.env.ADMIN_SECRET || "paco_admin_secret_key_2026_super_secure";

export function generateSessionToken(username: string): string {
  const timestamp = Date.now();
  const payload = `${username}:${timestamp}`;
  const hmac = crypto.createHmac("sha256", SECRET_KEY).update(payload).digest("hex");
  return `${payload}:${hmac}`;
}

export function verifySessionToken(token: string | undefined): { valid: boolean; username?: string } {
  if (!token) return { valid: false };

  const parts = token.split(":");
  if (parts.length !== 3) return { valid: false };

  const [username, timestampStr, hmac] = parts;
  const timestamp = parseInt(timestampStr, 10);

  // Check if session is older than 8 hours
  const EIGHT_HOURS = 8 * 60 * 60 * 1000;
  if (Date.now() - timestamp > EIGHT_HOURS) {
    return { valid: false };
  }

  const expectedPayload = `${username}:${timestampStr}`;
  const expectedHmac = crypto.createHmac("sha256", SECRET_KEY).update(expectedPayload).digest("hex");

  if (crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(expectedHmac))) {
    return { valid: true, username };
  }

  return { valid: false };
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  return verifySessionToken(sessionCookie?.value);
}
