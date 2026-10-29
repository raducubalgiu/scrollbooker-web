"use client";

import { Box, useTheme } from "@mui/material";
import LandingNav from "./sections/LandingNav";
import LandingHero from "./sections/LandingHero";
import LandingHashtagMarquee from "./sections/LandingHashtagMarquee";
import LandingSocialBento from "./sections/LandingSocialBento";
import LandingNearMe from "./sections/LandingNearMe";
import LandingProfiles from "./sections/LandingProfiles";
import LandingBookingDemo from "./sections/LandingBookingDemo";
import LandingGallery from "./sections/LandingGallery";
import LandingMobileApps from "./sections/LandingMobileApps";
import LandingForBusinessTeaser from "./sections/LandingForBusinessTeaser";
import LandingFaq from "./sections/LandingFaq";
import LandingJoinCta from "./sections/LandingJoinCta";
import LandingFooter from "./sections/LandingFooter";

export default function LandingPageModule() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingNav displayAuth />
      <LandingHero />
      <LandingHashtagMarquee />
      <LandingSocialBento />
      <LandingNearMe />
      <LandingProfiles />
      <LandingBookingDemo />
      <LandingGallery namespace="homeGallery" />
      <LandingMobileApps />
      <LandingForBusinessTeaser />
      <LandingFaq />
      <LandingJoinCta />
      <LandingFooter displayLogin />
    </Box>
  );
}
