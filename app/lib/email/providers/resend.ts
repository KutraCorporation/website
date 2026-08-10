import { Resend } from "resend";
import type { EmailProvider, SendEmailParams, SendEmailResult } from "../types";

export class ResendProvider implements EmailProvider {
    private client: Resend;

    constructor(apiKey: string) {
        this.client = new Resend(apiKey);
    }

    async send(params: SendEmailParams): Promise<SendEmailResult> {
        const { error } = await this.client.emails.send({
            from: params.from,
            to: params.to,
            replyTo: params.replyTo,
            subject: params.subject,
            html: params.html,
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    }
}
