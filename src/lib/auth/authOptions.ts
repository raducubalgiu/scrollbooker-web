// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { LOG } from "@/utils/logger";
import { SECOND } from "@/utils/date-utils";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import axios from "axios";
import { map } from "lodash";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Sign In",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const { username, password } = credentials || {};

				if (!username || !password) return;

				const response = await fetch(
					`${process.env.BE_BASE_ENDPOINT}/auth/login`,
					{
						method: "POST",
						headers: { "Content-Type": "application/x-www-form-urlencoded" },
						body: new URLSearchParams({ username, password }),
					}
				);

				if (!response.ok) {
					return null;
				}

				const user = await response.json();

				const decoded = jwt.verify(
					user.access_token,
					process.env.JWT_SECRET as string
				) as DecodedToken;

				if (!decoded?.id || !decoded?.role) {
					throw new Error("Invalid token or missing User id or Role");
				}

				if (decoded.role == process.env.UNATHORIZED_ROLE) {
					await toast("Something went wrong!");
					return;
				}
				if (user) {
					return {
						accessToken: user.access_token,
						username: decoded.sub,
						refreshToken: user.refresh_token,
						accessTokenExpires: decoded.exp * 1000,
					};
				}

				return null;
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
		strategy: "jwt",
		// Seconds - How long until an idle session expires and is no longer valid.
		// This value can be checked in browser as 'Expires/Max-age' field for 'next-auth.session-token' cookies.
		maxAge: 10 * 60, // 10 min
	},

	// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		maxAge: 10 * 60, // 10 min
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const permissions = await getPermissions(user.accessToken);
				const userInfo = await getUserInfo(user.accessToken);

				token.accessToken = user.accessToken;
				token.accessTokenExpires = user.accessTokenExpires;
				token.username = user.username;
				token.permissions = permissions;
				token.user_id = userInfo.id;
				token.business_id = userInfo.business_id;
				token.business_type_id = userInfo.business_type_id;

				return token;
			}

			if (token) {
				const expireInMillis = token["accessTokenExpires"];
				// return previous token if the access token has not expired yet
				if (expireInMillis > new Date().getTime()) {
					return token;
				}

				// if accessToken is expired it will be refreshed
				if (token["refreshToken"]) {
					const expireAt = new Date(expireInMillis).toISOString();
					LOG.info(
						`Access token has expired at [${expireAt}], start refresh token.`
					);
					//return refreshAccessToken(token);
					// Should implement refresh token here
				}
			}

			LOG.error("Session token does not contain a valid token!");
			return null;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.username = token.username;
			session.user_id = token.user_id;
			session.business_id = token.business_id;
			session.business_type_id = token.business_type_id;
			session.permissions = token.permissions;

			const expireInMillis = token["accessTokenExpires"];
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

async function getPermissions(token) {
	const userPermissions = await axios.get(
		`${process.env.BE_BASE_ENDPOINT}/auth/user-permissions`,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return map(userPermissions.data, "code");
}

async function getUserInfo(token) {
	const user = await axios.get(
		`${process.env.BE_BASE_ENDPOINT}/auth/user-info`,
		{ headers: { Authorization: `Bearer ${token}` } }
	);
	return user.data;
}
