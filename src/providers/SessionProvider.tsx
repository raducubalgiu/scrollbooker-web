"use client";

import {
	SessionProvider as NextAuthSessionProvider,
	SessionProviderProps,
} from "next-auth/react";

const SESSION_REFETCH_INTERVAL = 60 * 5 - 10; // 5 min - 10 second

export default function SessionProvider({ children }: SessionProviderProps) {
	return (
		<NextAuthSessionProvider refetchInterval={SESSION_REFETCH_INTERVAL}>
			{children}
		</NextAuthSessionProvider>
	);
}
