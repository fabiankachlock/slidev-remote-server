declare global {
	namespace NodeJS {
		interface ProcessEnv {
			OAUTH_CLIENT_ID: string;
			OAUTH_CLIENT_SECRET: string;
			SESSION_SECRET: string;
		}
	}
}

export {};
