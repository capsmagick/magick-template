export interface SessionContext {
    session: {
        user: {
            id: string;
            email: string;
            name: string;
            role?: string;
        };
    } | null;
}