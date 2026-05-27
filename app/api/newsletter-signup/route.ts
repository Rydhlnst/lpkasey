import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { NewsletterSignupEmail } from "@/emails/newsletter-signup-email";

const newsletterSignupSchema = z.object({
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
});

const resendApiKey = process.env.RESEND_API_KEY;
const defaultFromEmail = "form@tepaeoterangi.co.nz";
const resendFromEmail = process.env.RESEND_FROM_EMAIL?.trim() || defaultFromEmail;
const resendToEmail = process.env.RESEND_TO_EMAIL ?? "contact@tepaeoterangi.co.nz";
const resendClient = resendApiKey ? new Resend(resendApiKey) : null;

function isAllowedSenderDomain(email: string) {
  return email.toLowerCase().endsWith("@tepaeoterangi.co.nz");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = newsletterSignupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { code: "VALIDATION_ERROR", message: "Invalid newsletter signup payload." } },
        { status: 400 },
      );
    }

    if (!resendClient) {
      return NextResponse.json(
        {
          error: {
            code: "EMAIL_CONFIG_MISSING",
            message: "Newsletter email integration is not configured. Set RESEND_API_KEY.",
          },
        },
        { status: 500 },
      );
    }

    if (!isAllowedSenderDomain(resendFromEmail)) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_SENDER_DOMAIN",
            message: "RESEND_FROM_EMAIL must use @tepaeoterangi.co.nz domain.",
          },
        },
        { status: 500 },
      );
    }

    const { firstName, lastName, email } = parsed.data;

    const { data, error } = await resendClient.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      subject: `Newsletter Signup: ${firstName} ${lastName}`,
      replyTo: email,
      react: NewsletterSignupEmail({
        firstName,
        lastName,
        email,
      }),
    });

    if (error) {
      return NextResponse.json(
        { error: { code: "EMAIL_SEND_FAILED", message: error.message } },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      id: data?.id ?? null,
      message: "Newsletter signup received.",
    });
  } catch {
    return NextResponse.json(
      {
        error: {
          code: "UNEXPECTED_ERROR",
          message: "Failed to process newsletter signup.",
        },
      },
      { status: 500 },
    );
  }
}
