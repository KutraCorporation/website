interface SocialAccount {
    _type: string,
    url: string
};

export interface TeamDetail {
    title: string,
    roleKey: string,
    avatar?: string,
    socialAccounts: SocialAccount[];
};