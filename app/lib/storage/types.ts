export type ContactSubmission = {
    name: string;
    email: string;
    subject: string;
    message: string;
};

export type SaveResult = {
    success: boolean;
    id?: number;
    error?: string;
};

export interface StorageProvider {
    saveContact(submission: ContactSubmission): Promise<SaveResult>;
}
