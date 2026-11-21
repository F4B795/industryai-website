import { createClient } from "npm:@supabase/supabase-js@2.119.2";

const ALLOWED_ORIGIN = "https://industryai.github.io";
const EXPECTED_HOSTNAME = "industryai.github.io";
const EXPECTED_ACTION = "contact_message_submit";
const MAX_BODY_BYTES = 8_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
  "Vary": "Origin",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return "";
  const cleaned = value
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .trim();
  return cleaned.length > maxLength ? null : cleaned;
}

async function hmacHex(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return req.headers.get("cf-connecting-ip")?.trim() ||
    req.headers.get("x-real-ip")?.trim() ||
    forwarded ||
    "";
}

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const publishableKeys = JSON.parse(Deno.env.get("SUPABASE_PUBLISHABLE_KEYS") ?? "{}");
const publishableKey = publishableKeys.default ?? "";
const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
const secretKey = secretKeys.default ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const adminClient = supabaseUrl && secretKey
  ? createClient(supabaseUrl, secretKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  : null;

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin") ?? "";
  if (origin !== ALLOWED_ORIGIN) {
    return new Response("Forbidden", { status: 403 });
  }

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ success: false, error: "method_not_allowed" }, 405);
  }

  if (!publishableKey || req.headers.get("apikey") !== publishableKey) {
    return jsonResponse({ success: false, error: "invalid_api_key" }, 401);
  }

  const turnstileSecret = Deno.env.get("CLOUDFLARE_TURNSTILE_SECRET_KEY") ?? "";
  const rateLimitSecret = Deno.env.get("INDUSTRYAI_RATE_LIMIT_HMAC_SECRET") ?? "";
  if (!adminClient || !turnstileSecret || rateLimitSecret.length < 32) {
    console.error("Contact protection is not fully configured.");
    return jsonResponse({ success: false, error: "submission_protection_not_configured" }, 503);
  }

  const ip = getClientIp(req);
  if (!ip) {
    return jsonResponse({ success: false, error: "request_could_not_be_verified" }, 400);
  }

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return jsonResponse({ success: false, error: "invalid_request" }, 400);
  }
  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return jsonResponse({ success: false, error: "request_too_large" }, 413);
  }

  let input: Record<string, unknown>;
  try {
    const parsed = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("invalid");
    }
    input = parsed as Record<string, unknown>;
  } catch {
    return jsonResponse({ success: false, error: "invalid_request" }, 400);
  }

  // Simple hidden honeypot for low-effort automated submissions.
  const honeypot = cleanText(input.company_website, 200);
  if (honeypot === null || honeypot.length > 0) {
    return jsonResponse({ success: true }, 202);
  }

  const name = cleanText(input.name, 120);
  const emailValue = cleanText(input.email, 254);
  const subject = cleanText(input.subject, 160);
  const message = cleanText(input.message, 5000);
  const token = cleanText(input.turnstile_token, 4096);

  if ([name, emailValue, subject, message].some((value) => value === null)) {
    return jsonResponse({ success: false, error: "field_too_long" }, 400);
  }

  const normalizedEmail = (emailValue ?? "").toLowerCase();
  if (
    (name ?? "").length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) ||
    (subject ?? "").length < 2 ||
    (message ?? "").length < 10 ||
    !token ||
    token.length < 10
  ) {
    return jsonResponse({ success: false, error: "invalid_form_data" }, 400);
  }

  // Rate limits use keyed hashes. No raw IP address is stored in the rate-limit table.
  const ipHash = await hmacHex(rateLimitSecret, "ip:" + ip);
  const { data: ipAllowed, error: ipRateError } = await adminClient
    .rpc("consume_company_profile_rate_limit", {
      p_key_hash: ipHash,
      p_limit: 5,
      p_window_seconds: 3600,
    });
  if (ipRateError || ipAllowed !== true) {
    if (ipRateError) console.error("Contact IP rate-limit check failed:", ipRateError.message);
    return jsonResponse(
      { success: false, error: "rate_limit_exceeded" },
      ipRateError ? 503 : 429,
    );
  }

  const verificationBody = new FormData();
  verificationBody.append("secret", turnstileSecret);
  verificationBody.append("response", token);
  verificationBody.append("remoteip", ip);

  let verification: { success?: boolean; hostname?: string; action?: string };
  try {
    const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verificationBody,
    });
    if (!result.ok) throw new Error("Turnstile verification endpoint unavailable");
    verification = await result.json();
  } catch (error) {
    console.error("Contact Turnstile verification failed:", error);
    return jsonResponse({ success: false, error: "captcha_verification_unavailable" }, 503);
  }

  if (
    verification.success !== true ||
    verification.hostname !== EXPECTED_HOSTNAME ||
    verification.action !== EXPECTED_ACTION
  ) {
    return jsonResponse({ success: false, error: "captcha_verification_failed" }, 403);
  }

  const emailHash = await hmacHex(rateLimitSecret, "email:" + normalizedEmail);
  const { data: emailAllowed, error: emailRateError } = await adminClient
    .rpc("consume_company_profile_rate_limit", {
      p_key_hash: emailHash,
      p_limit: 3,
      p_window_seconds: 86400,
    });
  if (emailRateError || emailAllowed !== true) {
    if (emailRateError) console.error("Contact email rate-limit check failed:", emailRateError.message);
    return jsonResponse(
      { success: false, error: "rate_limit_exceeded" },
      emailRateError ? 503 : 429,
    );
  }

  const { data: inserted, error: insertError } = await adminClient
    .from("contact_messages")
    .insert({
      name: name,
      email: normalizedEmail,
      subject: subject,
      message: message,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    if (insertError) console.error("Contact message insert failed:", insertError.message);
    return jsonResponse({ success: false, error: "submission_failed" }, 500);
  }

  return jsonResponse({ success: true, reference: inserted.id }, 201);
});
