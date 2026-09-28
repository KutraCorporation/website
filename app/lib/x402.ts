import {
  HTTPFacilitatorClient,
  x402ResourceServer,
  type RouteConfig,
} from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import type { Network } from "@x402/core/types";

const X402_FACILITATOR_URL =
  process.env.X402_FACILITATOR_URL || "https://facilitator.payai.network";

export const X402_NETWORK = (process.env.X402_NETWORK || "eip155:84532") as Network;
export const X402_PRICE = process.env.X402_PRICE || "$0.01";
export const X402_PAY_TO = process.env.X402_PAY_TO_ADDRESS || "";

export function isX402Configured(): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(X402_PAY_TO);
}

let resourceServer: x402ResourceServer | null = null;

export function getX402Server(): x402ResourceServer {
  if (!resourceServer) {
    const facilitatorClient = new HTTPFacilitatorClient({
      url: X402_FACILITATOR_URL,
    });
    resourceServer = registerExactEvmScheme(
      new x402ResourceServer(facilitatorClient),
    );
  }
  return resourceServer;
}

export function getX402RouteConfig(description: string): RouteConfig {
  return {
    accepts: {
      scheme: "exact",
      price: X402_PRICE,
      network: X402_NETWORK,
      payTo: X402_PAY_TO,
    },
    description,
    mimeType: "application/json",
    serviceName: "Kutra Corporation",
  };
}
