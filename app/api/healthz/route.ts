import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { env } = await getCloudflareContext();
    // This is a dependency check, not a full application readiness guarantee.
    const db = (env as { DB?: { prepare: (sql: string) => { first: () => Promise<unknown> } } }).DB;
    if (!db) {
      return NextResponse.json({ status: "degraded", checks: { d1: "unavailable" } }, { status: 503 });
    }
    await db.prepare("SELECT 1 AS ok").first();
    return NextResponse.json({ status: "ok", checks: { d1: "ok" } }, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ status: "degraded", checks: { d1: "error" } }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
