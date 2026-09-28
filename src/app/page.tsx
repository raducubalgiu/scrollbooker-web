import { Metadata } from "next";
import LandingPageModule from "@/components/modules/LandingPageModule/LandingPageModule";

export const metadata: Metadata = {
  title: "ScrollBooker — Video-First Booking pentru Beauty",
  description:
    "ScrollBooker e rețeaua socială din care se rezervă: feed video, follow, like, comentarii, recenzii video — plus calendar, servicii, produse și angajați administrate complet, într-un singur loc.",
};

export default async function HomePage() {
  return <LandingPageModule />;
}
