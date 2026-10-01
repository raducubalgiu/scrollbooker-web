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

  // Mesajele sunt despărțite pe arii (landing, getStarted, common, ...) ca
  // niciun fișier să nu ajungă uriaș pe măsură ce traducem și restul
  // aplicației — dar tot le unim aici într-un singur obiect, ca din
  // perspectiva componentelor (useTranslations/getTranslations) nimic să nu
  // se schimbe față de un singur fișier mare.
  const [
    landing,
    getStarted,
    registerBusiness,
    signin,
    onboarding,
    partners,
    myServices,
    mySchedules,
    myDashboard,
    common,
  ] = await Promise.all([
    import(`../../messages/${locale}/landing.json`),
    import(`../../messages/${locale}/getStarted.json`),
    import(`../../messages/${locale}/registerBusiness.json`),
    import(`../../messages/${locale}/signin.json`),
    import(`../../messages/${locale}/onboarding.json`),
    import(`../../messages/${locale}/partners.json`),
    import(`../../messages/${locale}/myServices.json`),
    import(`../../messages/${locale}/mySchedules.json`),
    import(`../../messages/${locale}/myDashboard.json`),
    import(`../../messages/${locale}/common.json`),
  ]);

  return {
    locale,
    messages: {
      ...landing.default,
      ...getStarted.default,
      ...registerBusiness.default,
      ...signin.default,
      ...onboarding.default,
      ...partners.default,
      ...myServices.default,
      ...mySchedules.default,
      ...myDashboard.default,
      ...common.default,
    },
  };
});
