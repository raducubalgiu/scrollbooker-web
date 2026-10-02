import { Box } from "@mui/material";
import { LANDING_COLORS } from "@/components/modules/LandingPageModule/landing.constants";
import LandingSyncChromeColor from "@/components/modules/LandingPageModule/components/LandingSyncChromeColor";
import LandingNav from "@/components/modules/LandingPageModule/sections/LandingNav";
import LandingFeatures from "@/components/modules/LandingPageModule/sections/LandingFeatures";
import LandingProfileShowcase from "@/components/modules/LandingPageModule/sections/LandingProfileShowcase";
import LandingAdminShowcase from "@/components/modules/LandingPageModule/sections/LandingAdminShowcase";
import LandingGallery from "@/components/modules/LandingPageModule/sections/LandingGallery";
import LandingCTA from "@/components/modules/LandingPageModule/sections/LandingCTA";
import LandingFooter from "@/components/modules/LandingPageModule/sections/LandingFooter";
import ForBusinessHero from "./sections/ForBusinessHero";
import ForBusinessPainPoints from "./sections/ForBusinessPainPoints";
import ForBusinessCalendarShowcase from "./sections/ForBusinessCalendarShowcase";
import ForBusinessDiscoveryChannels from "./sections/ForBusinessDiscoveryChannels";
import ForBusinessHowItWorks from "./sections/ForBusinessHowItWorks";

export default function ForBusinessPageModule() {
  return (
    <Box
      sx={{
        backgroundColor: LANDING_COLORS.background,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingSyncChromeColor />
      <LandingNav />
      <ForBusinessHero />
      <ForBusinessPainPoints />
      <LandingAdminShowcase />
      <LandingFeatures />
      <LandingProfileShowcase />
      <ForBusinessCalendarShowcase />
      <ForBusinessDiscoveryChannels />
      <ForBusinessHowItWorks />
      <LandingGallery />
      <LandingCTA />
      <LandingFooter />
    </Box>
  );
}
