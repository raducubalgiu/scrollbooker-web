import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface User {
		id: string;
		name?: string | null;
		email?: string | null;

		accessToken: string,
		username: string,
		refreshToken: string,
		accessTokenExpires: number,
	}

	interface Session extends DefaultSession {
		accessToken: string;
		user_id: number;
		business_id: number | null | undefined;
		business_type_id: number | null | undefined;
		username: string;
		permissions: string[];
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		username: string;
		accessToken: string;
		refreshToken: string;
		accessTokenExpires: number;

		// extra
		permissions?: string[];
		user_id?: number;
		business_id?: number | null;
		business_type_id?: number | null;
		error?: "RefreshAccessTokenError"
	}
}
