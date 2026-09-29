"use server";

import { cookies } from "next/headers";
import { defaultLocale, localeCookieName, type Locale } from "./config";

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return (cookieStore.get(localeCookieName)?.value as Locale) || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(localeCookieName, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
