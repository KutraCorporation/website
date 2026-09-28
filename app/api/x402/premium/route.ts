import { NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import {
  getX402RouteConfig,
  getX402Server,
  isX402Configured,
} from "@/lib/x402";

const handler = async () => {
  return NextResponse.json({
    ok: true,
    data: {
      title: "Kutra Premium Ecosystem Report",
      generatedAt: new Date().toISOString(),
      items: [
        { id: "authenticator", name: "Authenticator", category: "Security" },
        { id: "certwallet", name: "CertWallet", category: "Verifiable Credentials" },
      ],
    },
  });
};

export const GET = isX402Configured()
  ? withX402(
      handler,
      getX402RouteConfig("Kutra premium ecosystem report"),
      getX402Server(),
    )
  : async () =>
      NextResponse.json(
        { error: "x402_disabled", message: "Paid access is not configured." },
        { status: 503 },
      );
