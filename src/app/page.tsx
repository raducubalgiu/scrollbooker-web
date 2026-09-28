import { Metadata, Viewport } from "next";
import LandingPageModule from "@/components/modules/LandingPageModule/LandingPageModule";

export const metadata: Metadata = {
  title: "ScrollBooker — Video-First Booking pentru Beauty",
  description:
    "ScrollBooker e rețeaua socială din care se rezervă: feed video, follow, like, comentarii, recenzii video — plus calendar, servicii, produse și angajați administrate complet, într-un singur loc.",
};

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
}
