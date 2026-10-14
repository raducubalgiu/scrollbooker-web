"use client";

import {
  SessionProvider as NextAuthSessionProvider,
  SessionProviderProps,
} from "next-auth/react";

const SESSION_REFETCH_INTERVAL = 60 * 5 - 10; // 290s

export default function SessionProvider({
  children,
  session,
}: SessionProviderProps) {
  return (
    <NextAuthSessionProvider
      session={session ?? null}
      refetchInterval={SESSION_REFETCH_INTERVAL}
    >
      {children}
    </NextAuthSessionProvider>
  );
}
