import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session extends DefaultSession {
		accessToken: string;
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
		name: string;
		permissions: string[];
	}
}
