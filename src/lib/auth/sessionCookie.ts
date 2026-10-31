import { NextRequest, NextResponse } from "next/server";
import { encode, JWT } from "next-auth/jwt";

export const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

const BASE_COOKIE_NAME = "next-auth.session-token";
const SECURE_COOKIE_NAME = `__Secure-${BASE_COOKIE_NAME}`;
// Aceeași împărțire în bucăți ca next-auth, ca getToken() să poată reasambla cookie-ul scris aici.
const CHUNK_SIZE = 4096 - 163;

type CookieWrite = { name: string; value: string };

function isSessionCookie(name: string, cookieName: string) {
  return name === cookieName || name.startsWith(`${cookieName}.`);
}

function resolveCookieName(req: NextRequest) {
  const hasSecure = req.cookies
    .getAll()
    .some((cookie) => isSessionCookie(cookie.name, SECURE_COOKIE_NAME));
  if (hasSecure) return SECURE_COOKIE_NAME;
  return req.nextUrl.protocol === "https:"
    ? SECURE_COOKIE_NAME
    : BASE_COOKIE_NAME;
}

async function buildWrites(
  cookieName: string,
  token: JWT | null
): Promise<CookieWrite[]> {
  if (!token) return [];

  const value = await encode({
    token,
    secret: process.env.NEXTAUTH_SECRET as string,
    maxAge: SESSION_MAX_AGE,
  });

  if (value.length <= CHUNK_SIZE) return [{ name: cookieName, value }];

  const chunkCount = Math.ceil(value.length / CHUNK_SIZE);
  return Array.from({ length: chunkCount }, (_, index) => ({
    name: `${cookieName}.${index}`,
    value: value.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE),
  }));
}

export type SessionCookieUpdate = {
  cookieName: string;
  writes: CookieWrite[];
  deletes: string[];
};

export async function prepareSessionCookieUpdate(
  req: NextRequest,
  token: JWT | null
): Promise<SessionCookieUpdate> {
  const cookieName = resolveCookieName(req);
  const writes = await buildWrites(cookieName, token);
  const written = new Set(writes.map((write) => write.name));
  const deletes = req.cookies
    .getAll()
    .map((cookie) => cookie.name)
    .filter((name) => isSessionCookie(name, cookieName) && !written.has(name));

  req.cookies.delete(deletes);
  writes.forEach(({ name, value }) => req.cookies.set(name, value));

  return { cookieName, writes, deletes };
}

export function applySessionCookieUpdate(
  response: NextResponse,
  update: SessionCookieUpdate
) {
  const secure = update.cookieName === SECURE_COOKIE_NAME;
  const options = { httpOnly: true, sameSite: "lax" as const, path: "/", secure };

  update.writes.forEach(({ name, value }) =>
    response.cookies.set(name, value, { ...options, maxAge: SESSION_MAX_AGE })
  );
  update.deletes.forEach((name) =>
    response.cookies.set(name, "", { ...options, maxAge: 0 })
  );
}
