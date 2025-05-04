import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken: string;
		user_id: number;
		business_id: number;
		username: string;
		permissions: string[];
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		refreshToken: string;
		accessToken: string;
		accessTokenExpires: number;
		expires_at: number;
		user_id: number;
		business_id: number;
		permissions: string[];
	}
}
