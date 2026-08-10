export type SendEmailParams = {
    from: string;
    to: string;
    subject: string;
    html: string;
    replyTo?: string;
};

export type SendEmailResult = {
    success: boolean;
    error?: string;
};

export interface EmailProvider {
    send(params: SendEmailParams): Promise<SendEmailResult>;
}
