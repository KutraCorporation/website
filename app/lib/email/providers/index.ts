import type { EmailProvider } from "../types";
import { ResendProvider } from "./resend";

type ProviderName = "resend";

let instance: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
    if (instance) return instance;

    const provider = (process.env.EMAIL_PROVIDER as ProviderName) || "resend";

    switch (provider) {
        case "resend":
            instance = new ResendProvider(process.env.RESEND_KEY!);
            break;
        default:
            throw new Error(`Unknown email provider: ${provider}`);
    }

    return instance;
}
