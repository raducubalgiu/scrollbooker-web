import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, User } from "next-auth";
import { LOG } from "@/utils/logger";
import { SECOND } from "@/utils/date-utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import axios, { AxiosResponse } from "axios";
import { map } from "lodash";
import { JWT } from "next-auth/jwt";
import { PermissionType } from "@/ts/models/Permission/PermissionType";

type DecodedTokenType = {
	id: number,
	sub: string,
	fullname: string,
	email: string,
	role: string,
	exp: number
}

type AuthResponseType = {
	access_token: string,
	refresh_token: string,
	token_type: string
}

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Sign In",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials: Record<"username" | "password", string> | undefined, _req): Promise<User | null> {
				const { username, password } = credentials || {};

				if (!username || !password) return null;

				const auth = await login(username, password)
				if(!auth) return null

				const decoded = await verifyToken(auth.access_token)
				if(!decoded) return null

				const user: User = {
					id: String(decoded.id),
					name: decoded.fullname,
					email: decoded.email,

					username: decoded.sub,
					accessToken: auth.access_token,
					refreshToken: auth.refresh_token,
					accessTokenExpires: decoded.exp * 1000
				}

				return user
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 10 * 60, // 10 min
	},
	jwt: {
		maxAge: 10 * 60, // 10 min
	},
	callbacks: {
		async jwt({ token, user }): Promise<JWT> {
			if (user) {
				const permissions = await getPermissions(user.accessToken);
				const userInfo = await getUserInfo(user.accessToken);

				return {
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
					accessTokenExpires: user.accessTokenExpires,
					username: user.username,
					permissions: permissions,
					user_id: userInfo.id,
					business_id: userInfo.business_id,
					business_type_id: userInfo.business_type_id
				}
			}
			if (token) {
				const expireInMillis = token.accessTokenExpires;

				// return previous token if the access token has not expired yet
				if (expireInMillis > new Date().getTime()) {
					return token;
				}

				try {
					const refreshed = await refreshToken(token.refreshToken)
					return { ...token, ...refreshed, error: undefined }

				} catch(error) {
					return { ...token, error: "RefreshAccessTokenError" as const }
				}
			}

			LOG.error("Session token does not contain a valid token!");
			return token
		},
		async session({ session, token }) {
			if(token.user_id && token.permissions) {
				session.accessToken = token.accessToken;
				session.username = token.username;
				session.user_id = token.user_id;
				session.business_id = token.business_id;
				session.business_type_id = token.business_type_id;
				session.permissions = token.permissions;
			}

			const expireInMillis = token.accessTokenExpires;
			const expiresAt = new Date(expireInMillis).toISOString();
			const expireInSeconds = (expireInMillis - new Date().getTime()) / SECOND;
			
			LOG.info(
				`Access token is valid until [${expiresAt}], expire in ${expireInSeconds} sec.`
			);
			LOG.info(`Session was checked and updated with accessToken.`);
			return session;
		},
	},
	pages: {
		signIn: "auth/signin",
	},
};

async function login(username: string, password: string): Promise<AuthResponseType | null> {
	try {
		const response = await axios.post(
			`${process.env.BE_BASE_ENDPOINT}/auth/login`,
			new URLSearchParams({ username, password }),
			{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
		)
		return response.data
	} catch (error: unknown) {
		if (error instanceof Error) {
			LOG.error(`Login Error: ${error.message}`)
			throw new Error(`Authentication Error: ${error.message}`);
		}
		return null
	}

}

async function verifyToken(token: string): Promise<DecodedTokenType | null> {
	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET as string
		) as JwtPayload & DecodedTokenType;

		if (!decoded.id || !decoded.role) {
			LOG.error("Invalid token or missing User id or Role")
			return null;
		}

		if (decoded.role == process.env.UNATHORIZED_ROLE) {
			LOG.error(`This role is not authorized to login. Role: ${decoded.role}`)
			return null;
		}

		return decoded;
	} catch(err) {
		LOG.error(`JWT verification failed, ${err}`)
		return null
	}
}

async function getPermissions(token: string): Promise<string[]> {
	const userPermissions: AxiosResponse<PermissionType[]> = await axios.get(
		`${process.env.BE_BASE_ENDPOINT}/auth/user-permissions`,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return map(userPermissions.data, "code");
}

async function getUserInfo(token: string) {
	const user = await axios.get(
		`${process.env.BE_BASE_ENDPOINT}/auth/user-info`,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return user.data;
}

async function refreshToken(refreshToken: string): Promise<JWT> {
	try {
		const { data } = await axios.post(
			`${process.env.BE_BASE_ENDPOINT}/auth/refresh`,
			{ refresh_token: refreshToken }
		)

		const decoded = await verifyToken(data.access_token)
		if(!decoded?.exp) throw new Error("Invalid refreshed token")

		const [permissions, userInfo] = await Promise.all([
			getPermissions(data.access_token),
			getUserInfo(data.access_token)
		])

		return {
			accessToken: data.access_token,
			refreshToken: data.refresh_token,
			accessTokenExpires: decoded.exp * 1000,
			username: userInfo.username,
			permissions: permissions,
			user_id: userInfo.id,
			business_id: userInfo.business_id,
			business_type_id: userInfo.business_type_id,
		}

	} catch(e) {
		LOG.error('Token cannot be refreshed! Session will be terminated')
		throw e
	}
}
