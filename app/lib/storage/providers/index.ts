import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { StorageProvider } from "../types";
import { D1Provider } from "./d1";

let instance: StorageProvider | null = null;

export function getStorageProvider(): StorageProvider {
    if (instance) return instance;

    const provider = process.env.STORAGE_PROVIDER || "d1";

    switch (provider) {
        case "d1": {
            const { env } = getCloudflareContext();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const db = (env as any).DB;
            if (!db) {
                throw new Error("D1 binding not found. Check wrangler.jsonc.");
            }
            instance = new D1Provider(db);
            break;
        }
        default:
            throw new Error(`Unknown storage provider: ${provider}`);
    }

    return instance;
}
