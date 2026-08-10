import type { StorageProvider, ContactSubmission, SaveResult } from "../types";

export class D1Provider implements StorageProvider {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private db: any;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(db: any) {
        this.db = db;
    }

    async saveContact(submission: ContactSubmission): Promise<SaveResult> {
        try {
            const result = await this.db
                .prepare(
                    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)"
                )
                .bind(
                    submission.name,
                    submission.email,
                    submission.subject,
                    submission.message
                )
                .run();

            return {
                success: result.success,
                id: result.meta.last_row_id,
            };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : "Database error",
            };
        }
    }
}
