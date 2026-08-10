import { NextRequest, NextResponse } from "next/server";
import { resolveMx } from "dns";
import { promisify } from "util";

const resolveMxAsync = promisify(resolveMx);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTH = 254;
const DISPOSABLE_DOMAINS = new Set([
    "mailinator.com",
    "guerrillamail.com",
    "tempmail.com",
    "throwaway.email",
    "temp-mail.org",
    "fakeinbox.com",
    "sharklasers.com",
    "guerrillamailblock.com",
    "grr.la",
    "dispostable.com",
    "yopmail.com",
    "yopmail.fr",
    "trashmail.com",
    "trashmail.net",
    "trashmail.org",
    "maildrop.cc",
    "10minutemail.com",
    "minutemail.com",
    "tempr.email",
    "discard.email",
    "discardmail.com",
    "mailcatch.com",
    "mailexpire.com",
    "tempinbox.com",
    "tempinbox.co.uk",
    "mohmal.com",
]);

const COMMON_DISPOSABLE_PREFIXES = ["temp", "throw", "trash", "dump", "junk", "spam"];

type VerificationResult = {
    valid: boolean;
    checks: {
        format: boolean;
        mx: boolean;
        disposable: boolean;
        roleAccount: boolean;
    };
    reason?: string;
};

function getDisposableDomain(email: string): string | null {
    const domain = email.split("@")[1]?.toLowerCase();
    if (!domain) return null;

    if (DISPOSABLE_DOMAINS.has(domain)) return domain;

    const parts = domain.split(".");
    for (const prefix of COMMON_DISPOSABLE_PREFIXES) {
        if (parts[0]?.startsWith(prefix)) return domain;
    }

    return null;
}

function isRoleAccount(email: string): boolean {
    const local = email.split("@")[0]?.toLowerCase();
    const roleAccounts = [
        "admin", "info", "support", "sales", "contact",
        "help", "abuse", "noc", "security", "postmaster",
        "hostmaster", "webmaster", "root", "sysadmin",
    ];
    return roleAccounts.includes(local);
}

async function checkMxRecords(domain: string): Promise<boolean> {
    try {
        const mxRecords = await resolveMxAsync(domain);
        return mxRecords.length > 0;
    } catch {
        return false;
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email } = body;

        if (typeof email !== "string") {
            return NextResponse.json(
                { valid: false, reason: "Invalid input" },
                { status: 400 }
            );
        }

        const trimmed = email.trim().toLowerCase();

        if (trimmed.length > MAX_LENGTH || !EMAIL_REGEX.test(trimmed)) {
            return NextResponse.json({
                valid: false,
                checks: { format: false, mx: false, disposable: false, roleAccount: false },
                reason: "Invalid email format",
            });
        }

        const domain = trimmed.split("@")[1];
        const disposableDomain = getDisposableDomain(trimmed);
        const mxValid = await checkMxRecords(domain);

        const result: VerificationResult = {
            valid: mxValid && !disposableDomain,
            checks: {
                format: true,
                mx: mxValid,
                disposable: !disposableDomain,
                roleAccount: isRoleAccount(trimmed),
            },
            reason: !mxValid
                ? "Domain does not accept email"
                : disposableDomain
                    ? "Disposable email addresses are not allowed"
                    : undefined,
        };

        return NextResponse.json(result, { status: 200 });
    } catch {
        return NextResponse.json(
            { valid: false, reason: "Verification failed" },
            { status: 500 }
        );
    }
}
