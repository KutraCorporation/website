import { NextRequest, NextResponse } from "next/server";
import { getEmailProvider } from "@/lib/email";
import { getStorageProvider } from "@/lib/storage";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "info@kutra.co";
const EMAIL_FROM = process.env.EMAIL_FROM || "Kutra Contact <onboarding@resend.dev>";

const MAX_MESSAGE_LENGTH = 2000;

function escapeHtml(input: string): string {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function buildContactHtml(name: string, email: string, subject: string, message: string): string {
    return `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #fafafa; border-radius: 12px;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="font-size: 20px; font-weight: 700; color: #111;">New Contact Message</h1>
                <p style="color: #666; font-size: 14px;">From ${escapeHtml(name)}</p>
            </div>
            <div style="background: white; border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px;">
                <table style="width: 100%; font-size: 14px; color: #333;">
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555; width: 100px;">Name</td>
                        <td style="padding: 8px 0;">${escapeHtml(name)}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555;">Email</td>
                        <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #119fc3;">${escapeHtml(email)}</a></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: 600; color: #555;">Subject</td>
                        <td style="padding: 8px 0;">${escapeHtml(subject)}</td>
                    </tr>
                </table>
                <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;" />
                <p style="font-size: 14px; color: #333; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
            </div>
            <p style="text-align: center; color: #999; font-size: 12px; margin-top: 24px;">
                Sent via Kutra Contact Form
            </p>
        </div>
    `;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof subject !== "string" ||
            typeof message !== "string"
        ) {
            return NextResponse.json({ error: "Invalid fields" }, { status: 400 });
        }

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        if (trimmedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
            return NextResponse.json({ error: "Message too long" }, { status: 400 });
        }

        const storage = getStorageProvider();
        const saveResult = await storage.saveContact({
            name: trimmedName,
            email: trimmedEmail,
            subject: trimmedSubject,
            message: trimmedMessage,
        });

        if (!saveResult.success) {
            return NextResponse.json({ error: saveResult.error }, { status: 500 });
        }

        const emailProvider = getEmailProvider();
        const emailResult = await emailProvider.send({
            from: EMAIL_FROM,
            to: CONTACT_EMAIL,
            replyTo: trimmedEmail,
            subject: `[Kutra] ${trimmedSubject}`,
            html: buildContactHtml(trimmedName, trimmedEmail, trimmedSubject, trimmedMessage),
        });

        if (!emailResult.success) {
            return NextResponse.json({ error: emailResult.error }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
