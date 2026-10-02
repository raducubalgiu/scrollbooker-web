import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import LandingPageModule from "@/components/modules/LandingPageModule/LandingPageModule";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";
//import UnderConstruction from "@/components/cutomized/UnderConstruction/UnderConstruction";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

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

export default async function HomePage() {
  return <LandingPageModule />;
  //return <UnderConstruction />;
}
