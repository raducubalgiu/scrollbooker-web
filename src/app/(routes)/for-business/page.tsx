import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import ForBusinessPageModule from "@/components/modules/ForBusinessPageModule/ForBusinessPageModule";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("forBusinessMetadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: LANDING_COLORS.background,
};

export default function ForBusinessPage() {
  return <ForBusinessPageModule />;
}
