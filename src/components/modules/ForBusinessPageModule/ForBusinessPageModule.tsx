"use client";

import { Box } from "@mui/material";
import { useLandingColors } from "@/components/modules/LandingPageModule/LandingThemeContext";
import { AppRoutes } from "@/utils/routes";
import LandingNav from "@/components/modules/LandingPageModule/sections/LandingNav";
import LandingFeatures from "@/components/modules/LandingPageModule/sections/LandingFeatures";
import LandingProfileShowcase from "@/components/modules/LandingPageModule/sections/LandingProfileShowcase";
import LandingAdminShowcase from "@/components/modules/LandingPageModule/sections/LandingAdminShowcase";
import LandingGallery from "@/components/modules/LandingPageModule/sections/LandingGallery";
import LandingCTA from "@/components/modules/LandingPageModule/sections/LandingCTA";
import LandingFooter from "@/components/modules/LandingPageModule/sections/LandingFooter";
import ForBusinessHero from "./sections/ForBusinessHero";
import ForBusinessLogo from "./components/ForBusinessLogo";
import ForBusinessPainPoints from "./sections/ForBusinessPainPoints";
import ForBusinessCalendarShowcase from "./sections/ForBusinessCalendarShowcase";
import ForBusinessDiscoveryChannels from "./sections/ForBusinessDiscoveryChannels";
import ForBusinessHowItWorks from "./sections/ForBusinessHowItWorks";

export default function ForBusinessPageModule() {
  const LANDING_COLORS = useLandingColors();

  return (
    <Box
      sx={{
        backgroundColor: LANDING_COLORS.background,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingNav
        registerHref={AppRoutes.partners()}
        logo={<ForBusinessLogo height={18} />}
      />
      <ForBusinessHero />
      <ForBusinessPainPoints />
      <LandingProfileShowcase />
      <ForBusinessDiscoveryChannels />
      <LandingFeatures />
      <ForBusinessCalendarShowcase />
      <LandingAdminShowcase />
      <ForBusinessHowItWorks />
      <LandingGallery />
      <LandingCTA href={AppRoutes.partners()} />
      <LandingFooter registerHref={AppRoutes.partners()} />
    </Box>
  );
}
