import { Browser, BrowserContext, expect, Page } from "@playwright/test";
import { decode, encode, JWT } from "next-auth/jwt";
import { Account } from "./accounts";
import { nextAuthSecret, WEB_URL } from "./env";

const SESSION_COOKIE = "next-auth.session-token";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

export const USER_AGENTS = {
  macChrome:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
  iphoneSafari:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
};

export type Device = { context: BrowserContext; page: Page };

export async function openDevice(
  browser: Browser,
  userAgent: string = USER_AGENTS.macChrome,
): Promise<Device> {
  const context = await browser.newContext({
    baseURL: WEB_URL,
    locale: "ro-RO",
    userAgent,
    viewport: { width: 1440, height: 900 },
  });
  return { context, page: await context.newPage() };
}

export async function signInThroughApi(device: Device, account: Account) {
  const csrf = await device.context.request.get("/api/auth/csrf");
  const { csrfToken } = (await csrf.json()) as { csrfToken: string };

  const response = await device.context.request.post(
    "/api/auth/callback/credentials",
    {
      form: {
        csrfToken,
        username: account.email,
        password: account.password,
        json: "true",
      },
    },
  );
  expect(response.ok()).toBeTruthy();
  expect(await readSessionToken(device.context)).not.toBeNull();
}

async function sessionCookie(context: BrowserContext) {
  const cookies = await context.cookies(WEB_URL);
  if (cookies.some((cookie) => cookie.name.startsWith(`${SESSION_COOKIE}.`))) {
    throw new Error(
      "chunked session cookies are not supported by the e2e helpers",
    );
  }
  return cookies.find((cookie) => cookie.name === SESSION_COOKIE);
}

export async function readSessionToken(
  context: BrowserContext,
): Promise<JWT | null> {
  const cookie = await sessionCookie(context);
  if (!cookie) return null;
  return decode({ token: cookie.value, secret: nextAuthSecret() });
}

export async function expireAccessToken(context: BrowserContext) {
  const cookie = await sessionCookie(context);
  const token = await readSessionToken(context);
  if (!cookie || !token) throw new Error("no session cookie to expire");

  const value = await encode({
    token: { ...token, accessTokenExpires: Date.now() - 1000 },
    secret: nextAuthSecret(),
    maxAge: SESSION_MAX_AGE,
  });
  await context.addCookies([{ ...cookie, value }]);
}

export async function openForm(page: Page, path: string) {
  await page.goto(path);
  // În modul dev formularul apare înainte de hidratare, iar hidratarea șterge ce s-a tastat deja.
  await page.waitForLoadState("networkidle");
}
