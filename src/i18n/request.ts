import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { locales, localeCookieName, type Locale } from "./config";

// Fără cookie (prima vizită), alegem limba din Accept-Language în loc de un
// fallback fix — un vizitator cu browser-ul pe engleză/orice altă limbă
// primește engleză, nu română implicit. Doar cine preferă explicit română
// (ro-RO, ro-MD etc.) primește română din start. Odată ce cineva apasă
// comutatorul de limbă, cookie-ul are prioritate față de orice detectare.
function detectLocaleFromAcceptLanguage(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "en";

  const preferredTag = acceptLanguage.split(",")[0]?.split(";")[0]?.trim();
  const preferredLanguage = preferredTag?.split("-")[0]?.toLowerCase();

  return preferredLanguage === "ro" ? "ro" : "en";
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  let locale: Locale;
  if (locales.includes(cookieLocale as Locale)) {
    locale = cookieLocale as Locale;
  } else {
    const headerStore = await headers();
    locale = detectLocaleFromAcceptLanguage(headerStore.get("accept-language"));
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
