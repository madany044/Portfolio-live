import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(12).max(2000),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = contactSchema.parse(payload);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail = process.env.CONTACT_TO_EMAIL ?? "madanmadany2004@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "portfolio@updates.madaan.dev";

    // Send notification email
    await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `New portfolio message from ${parsed.name}`,
      text: `Name: ${parsed.name}\nEmail: ${parsed.email}\nCompany: ${parsed.company ?? "-"}\n\nMessage:\n${parsed.message}`,
      html: `
        <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5; color: #0b1220;">
          <h2 style="margin:0 0 12px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${parsed.name}</p>
          <p><strong>Email:</strong> ${parsed.email}</p>
          <p><strong>Company:</strong> ${parsed.company ?? "-"}</p>
          <p style="white-space: pre-wrap; margin-top: 16px;"><strong>Message:</strong><br/>${parsed.message}</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;"/>
          <p style="font-size:12px; color:#6b7280;">Sent ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, issues: error.issues },
        { status: 422 },
      );
    }

    return NextResponse.json(
      { ok: false, message: "Unexpected error" },
      { status: 500 },
    );
  }
}

