"use client";

import { Box, useTheme } from "@mui/material";
import { AppRoutes } from "@/utils/routes";
import LandingNav from "@/components/modules/LandingPageModule/sections/LandingNav";
import LandingFeatures from "@/components/modules/LandingPageModule/sections/LandingFeatures";
import LandingProfileShowcase from "@/components/modules/LandingPageModule/sections/LandingProfileShowcase";
import LandingAdminShowcase from "@/components/modules/LandingPageModule/sections/LandingAdminShowcase";
import LandingGallery from "@/components/modules/LandingPageModule/sections/LandingGallery";
import LandingCTA from "@/components/modules/LandingPageModule/sections/LandingCTA";
import LandingFooter from "@/components/modules/LandingPageModule/sections/LandingFooter";
import LandingFaq from "@/components/modules/LandingPageModule/sections/LandingFaq";
import ForBusinessHero from "./sections/ForBusinessHero";
import ForBusinessLogo from "./components/ForBusinessLogo";
import ForBusinessCalendarShowcase from "./sections/ForBusinessCalendarShowcase";
import ForBusinessDiscoveryChannels from "./sections/ForBusinessDiscoveryChannels";
import ForBusinessHowItWorks from "./sections/ForBusinessHowItWorks";
import ForBusinessBookingModes from "./sections/ForBusinessBookingModes";

export default function ForBusinessPageModule() {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: palette.background.default,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingNav
        logo={
          <Box
            sx={{
              display: "flex",
              "& img": { height: { xs: 22, md: 26 }, width: "auto" },
            }}
          >
            <ForBusinessLogo height={26} />
          </Box>
        }
        displayCta
      />
      <ForBusinessHero />
      <ForBusinessBookingModes />
      <ForBusinessHowItWorks />
      <LandingProfileShowcase />
      <ForBusinessDiscoveryChannels />
      <LandingFeatures />
      <ForBusinessCalendarShowcase />
      <LandingAdminShowcase />
      <LandingGallery />
      <LandingFaq namespace="forBusinessFaq" />
      <LandingCTA href={AppRoutes.registerBusiness()} />
      <LandingFooter registerHref={AppRoutes.registerBusiness()} />
    </Box>
  );
}
