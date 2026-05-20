import { Resend } from "resend";
import { NextRequest } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// In-memory rate limiter: max 5 submissions per IP per 10 minutes.
// Works within a single warm serverless instance. Combined with the
// honeypot below, this stops both automated scripts and casual abusers.
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  // --- Origin check: block cross-site form submissions from browsers ---
  const host   = request.headers.get("host") ?? "";
  const origin = request.headers.get("origin");
  if (origin && !origin.includes(host)) {
    return Response.json({ error: "Forbidden." }, { status: 403 });
  }

  // --- IP-based rate limiting ---
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // --- Parse and type-guard all fields ---
  let name: string, email: string, subject: string, message: string, website: string;
  try {
    const body = await request.json();
    name    = typeof body.name    === "string" ? body.name.trim()    : "";
    email   = typeof body.email   === "string" ? body.email.trim()   : "";
    subject = typeof body.subject === "string" ? body.subject.trim() : "";
    message = typeof body.message === "string" ? body.message.trim() : "";
    website = typeof body.website === "string" ? body.website        : "";
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  // --- Honeypot: bots auto-fill hidden fields; real users never see it ---
  // Silently succeed so bots don't know they were caught.
  if (website) {
    return Response.json({ success: true });
  }

  // --- Field validation ---
  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email address." }, { status: 400 });
  }

  // --- Send email ---
  const { error } = await resend.emails.send({
    from: "Portfolio Contact <contact@udipmandora.com>",
    to: "udipmandora42@gmail.com",
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return Response.json({ error: "Failed to send email." }, { status: 500 });
  }

  return Response.json({ success: true });
}
