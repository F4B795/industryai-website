import { createClient } from "npm:@supabase/supabase-js@2.119.2";

const ALLOWED_ORIGIN = "https://industryai.github.io";
const EXPECTED_HOSTNAME = "industryai.github.io";
const EXPECTED_ACTION = "company_profile_submit";
const MAX_BODY_BYTES = 24_000;

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
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

function text(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return "";
  const cleaned = value.replace(/\u0000/g, "").trim();
  if (cleaned.length > maxLength) return null;
  return cleaned;
}

function validWebsite(value: string): boolean {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return (parsed.protocol === "https:" || parsed.protocol === "http:") &&
      Boolean(parsed.hostname) && !parsed.username && !parsed.password;
  } catch {
    return false;
  }
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
    forwarded || "";
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

  // The publishable key identifies the project; it is not treated as a user secret.
  if (!publishableKey || req.headers.get("apikey") !== publishableKey) {
    return jsonResponse({ success: false, error: "invalid_api_key" }, 401);
  }

  if (Deno.env.get("INDUSTRYAI_PUBLIC_SUBMISSIONS_ENABLED") !== "true") {
    return jsonResponse({ success: false, error: "submission_temporarily_disabled" }, 503);
  }

  const turnstileSecret = Deno.env.get("CLOUDFLARE_TURNSTILE_SECRET_KEY") ?? "";
  const rateLimitSecret = Deno.env.get("INDUSTRYAI_RATE_LIMIT_HMAC_SECRET") ?? "";
  if (!adminClient || !turnstileSecret || rateLimitSecret.length < 32) {
    console.error("Company submission protection is not fully configured.");
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
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    input = parsed as Record<string, unknown>;
  } catch {
    return jsonResponse({ success: false, error: "invalid_request" }, 400);
  }

  // A honeypot field catches simple bots without revealing the detection rule.
  const honeypot = text(input.company_fax, 200);
  if (honeypot === null || honeypot.length > 0) {
    return jsonResponse({ success: true }, 202);
  }

  const fields = {
    company_name: text(input.company_name, 160),
    location: text(input.location, 160),
    sector: text(input.sector, 120),
    website: text(input.website, 500),
    description: text(input.description, 5000),
    apprenticeships: text(input.apprenticeships, 5000),
    jobs: text(input.jobs, 5000),
    media: text(input.media, 3000),
    workplace: text(input.workplace, 3000),
    technology: text(input.technology, 3000),
    benefits: text(input.benefits, 3000),
    culture: text(input.culture, 3000),
    development: text(input.development, 3000),
    contact_person: text(input.contact_person, 160),
    contact_email: text(input.contact_email, 254),
  };

  if (Object.values(fields).some((value) => value === null)) {
    return jsonResponse({ success: false, error: "field_too_long" }, 400);
  }

  const payload = fields as { [K in keyof typeof fields]: string };
  const email = payload.contact_email.toLowerCase();
  if (
    payload.company_name.length < 2 ||
    payload.contact_person.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !validWebsite(payload.website)
  ) {
    return jsonResponse({ success: false, error: "invalid_form_data" }, 400);
  }

  // Rate limit before CAPTCHA verification to make repeated failed attempts costly.
  const clientIpHash = await hmacHex(rateLimitSecret, "ip:" + ip);
  const { data: ipAllowed, error: ipRateError } = await adminClient
    .rpc("consume_company_profile_rate_limit", {
      p_key_hash: clientIpHash,
      p_limit: 5,
      p_window_seconds: 3600,
    });
  if (ipRateError || ipAllowed !== true) {
    if (ipRateError) console.error("IP rate-limit check failed:", ipRateError.message);
    return jsonResponse({ success: false, error: "rate_limit_exceeded" }, ipRateError ? 503 : 429);
  }

  const token = text(input.turnstile_token, 4096);
  if (!token || token.length < 10) {
    return jsonResponse({ success: false, error: "captcha_required" }, 400);
  }

  const verificationBody = new FormData();
  verificationBody.append("secret", turnstileSecret);
  verificationBody.append("response", token);
  verificationBody.append("remoteip", ip);

  let verification: { success?: boolean; hostname?: string; action?: string };
  try {
    const result = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body: verificationBody },
    );
    if (!result.ok) throw new Error("Turnstile verification endpoint unavailable");
    verification = await result.json();
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return jsonResponse({ success: false, error: "captcha_verification_unavailable" }, 503);
  }

  if (
    verification.success !== true ||
    verification.hostname !== EXPECTED_HOSTNAME ||
    verification.action !== EXPECTED_ACTION
  ) {
    return jsonResponse({ success: false, error: "captcha_verification_failed" }, 403);
  }

  // A second keyed limit reduces repeated submissions for one contact address.
  const emailHash = await hmacHex(rateLimitSecret, "email:" + email);
  const { data: emailAllowed, error: emailRateError } = await adminClient
    .rpc("consume_company_profile_rate_limit", {
      p_key_hash: emailHash,
      p_limit: 3,
      p_window_seconds: 86400,
    });
  if (emailRateError || emailAllowed !== true) {
    if (emailRateError) console.error("Email rate-limit check failed:", emailRateError.message);
    return jsonResponse({ success: false, error: "rate_limit_exceeded" }, emailRateError ? 503 : 429);
  }

  const { data: inserted, error: insertError } = await adminClient
    .from("company_submissions")
    .insert({
      ...payload,
      contact_email: email,
      // status and internal_note are server/database controlled.
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    if (insertError) console.error("Company profile insert failed:", insertError.message);
    return jsonResponse({ success: false, error: "submission_failed" }, 500);
  }

  return jsonResponse({ success: true, reference: inserted.id }, 201);
});
