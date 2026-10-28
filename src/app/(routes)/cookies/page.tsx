import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CookiesPolicyModule from "@/components/modules/LegalModule/CookiesPolicyModule";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cookiesPolicy.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CookiesPage() {
  return <CookiesPolicyModule />;
}
