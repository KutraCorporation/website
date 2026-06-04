interface SocialAccount {
    _type: string,
    url: string
};

export interface TeamDetail {
    title: string,
    role: string,
    avatar?: string,
    socialAccounts: SocialAccount[];
};