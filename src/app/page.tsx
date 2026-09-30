import { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";
import LandingPageModule from "@/components/modules/LandingPageModule/LandingPageModule";
//import UnderConstruction from "@/components/cutomized/UnderConstruction/UnderConstruction";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

// Landing page-ul rămâne mereu dark (aceeași logică ca BottomBar.isDarkPage
// pentru "/"), deci forțăm și chrome-ul mobil (status bar iOS, bara Chrome
// pe Android) să rămână negru, indiferent de light/dark mode-ul sistemului —
// nu moștenește asta de la layout-ul rădăcină, ca să nu afecteze restul
// aplicației (care respectă ThemeContext-ul real).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export default async function HomePage() {
  return <LandingPageModule />;
  //return <UnderConstruction />;
}
