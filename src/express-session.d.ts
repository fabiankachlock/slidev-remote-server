import 'express-session';

declare module 'express-session' {
	interface User {
		email: string;
		token: string;
		internalId: string;
		providerId: string;
		provider: string;
	}

	export interface Session {
		user?: User;
	}
}
