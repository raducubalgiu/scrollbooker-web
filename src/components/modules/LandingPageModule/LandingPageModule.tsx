"use client";

import { Box } from "@mui/material";
import { useLandingColors } from "./LandingThemeContext";
import LandingAnnouncementBar from "./sections/LandingAnnouncementBar";
import LandingNav from "./sections/LandingNav";
import LandingHero from "./sections/LandingHero";
import LandingSocialContrast from "./sections/LandingSocialContrast";
import LandingBookingDemo from "./sections/LandingBookingDemo";
import LandingForBusinessTeaser from "./sections/LandingForBusinessTeaser";
import LandingGallery from "./sections/LandingGallery";
import LandingMobileApps from "./sections/LandingMobileApps";
import LandingCTA from "./sections/LandingCTA";
import LandingFooter from "./sections/LandingFooter";

export default function LandingPageModule() {
  const LANDING_COLORS = useLandingColors();

  return (
    <Box
      sx={{
        backgroundColor: LANDING_COLORS.background,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingAnnouncementBar />
      <LandingNav />
      <LandingHero />
      <LandingSocialContrast />
      <LandingBookingDemo />
      <LandingGallery />
      <LandingMobileApps />
      <LandingForBusinessTeaser />
      <LandingCTA />
      <LandingFooter />
    </Box>
  );
}
