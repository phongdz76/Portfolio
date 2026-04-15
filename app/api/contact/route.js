import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID ||
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "nguyenhothanhphong5@gmail.com";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(value) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request) {
  try {
    const body = await request.json();
    const userName = normalizeInput(body?.user_name);
    const userEmail = normalizeInput(body?.user_email);
    const subject = normalizeInput(body?.subject) || "Portfolio Contact";
    const message = normalizeInput(body?.message);

    if (!userName || !userEmail || !message) {
      return NextResponse.json(
        { message: "Missing required contact fields." },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(userEmail)) {
      return NextResponse.json(
        { message: "Invalid email format." },
        { status: 400 },
      );
    }

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      console.error("Contact API misconfigured: EmailJS vars are missing");
      return NextResponse.json(
        { message: "Contact service is not configured." },
        { status: 500 },
      );
    }

    const emailPayload = {
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: {
        user_name: userName,
        user_email: userEmail,
        subject,
        message,
        to_email: CONTACT_TO_EMAIL,
      },
    };

    if (EMAILJS_PRIVATE_KEY) {
      emailPayload.accessToken = EMAILJS_PRIVATE_KEY;
    }

    const emailResponse = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
      cache: "no-store",
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      console.error("EmailJS request failed", {
        status: emailResponse.status,
        details,
      });

      const lowerDetails = details.toLowerCase();
      if (
        emailResponse.status === 403 &&
        lowerDetails.includes("non-browser environments")
      ) {
        return NextResponse.json(
          {
            code: "EMAILJS_NON_BROWSER_BLOCKED",
            message:
              "Email service is blocked by EmailJS security settings. Enable 'API access from non-browser environments' in EmailJS Dashboard > Account > Security.",
          },
          { status: 503 },
        );
      }

      if (
        emailResponse.status === 403 &&
        lowerDetails.includes("strict mode") &&
        lowerDetails.includes("no private key")
      ) {
        return NextResponse.json(
          {
            code: "EMAILJS_PRIVATE_KEY_REQUIRED",
            message:
              "EmailJS strict mode is enabled. Add EMAILJS_PRIVATE_KEY to your .env/.env.local or disable 'Use Private Key' in EmailJS Dashboard > Account > Security.",
          },
          { status: 503 },
        );
      }

      if (emailResponse.status === 400) {
        if (lowerDetails.includes("service id not found")) {
          return NextResponse.json(
            {
              code: "EMAILJS_SERVICE_ID_INVALID",
              message:
                "EMAILJS_SERVICE_ID is invalid or deleted. Copy the correct Service ID from EmailJS Dashboard > Email Services and update .env/.env.local.",
            },
            { status: 502 },
          );
        }

        if (lowerDetails.includes("template id not found")) {
          return NextResponse.json(
            {
              code: "EMAILJS_TEMPLATE_ID_INVALID",
              message:
                "EMAILJS_TEMPLATE_ID is invalid. Copy the correct Template ID from EmailJS Dashboard > Email Templates and update .env/.env.local.",
            },
            { status: 502 },
          );
        }

        if (lowerDetails.includes("public key is invalid")) {
          return NextResponse.json(
            {
              code: "EMAILJS_PUBLIC_KEY_INVALID",
              message:
                "EMAILJS_PUBLIC_KEY is invalid. Copy the correct Public Key from EmailJS Dashboard > Account.",
            },
            { status: 502 },
          );
        }

        return NextResponse.json(
          {
            code: "EMAILJS_BAD_REQUEST",
            message:
              "Email service configuration is invalid. Please recheck EmailJS public key, service ID, and template ID.",
          },
          { status: 502 },
        );
      }

      return NextResponse.json(
        {
          code: "EMAILJS_SEND_FAILED",
          message: "Unable to send message right now.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API unexpected error", error);
    return NextResponse.json(
      { message: "Unable to send message right now." },
      { status: 500 },
    );
  }
}
