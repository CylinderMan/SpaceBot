declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string,
            guildId: string,
            NASA_API_KEY: string,
            WHSTK_API_KEY: string,
            MONGO_DB_URL: string,
            environment: "dev" | "prod" | "debug";
        }
    }
}

export {};
