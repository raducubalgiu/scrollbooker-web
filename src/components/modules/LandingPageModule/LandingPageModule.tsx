import { Box } from "@mui/material";
import { LANDING_COLORS } from "./landing.constants";
import LandingForceDarkChrome from "./components/LandingForceDarkChrome";
import LandingAnnouncementBar from "./sections/LandingAnnouncementBar";
import LandingNav from "./sections/LandingNav";
import LandingHero from "./sections/LandingHero";
import LandingSocialContrast from "./sections/LandingSocialContrast";
import LandingForBusinessDivider from "./sections/LandingForBusinessDivider";
import LandingFeatures from "./sections/LandingFeatures";
import LandingProfileShowcase from "./sections/LandingProfileShowcase";
import LandingHowItWorks from "./sections/LandingHowItWorks";
import LandingAdminShowcase from "./sections/LandingAdminShowcase";
import LandingGallery from "./sections/LandingGallery";
import LandingMobileApps from "./sections/LandingMobileApps";
import LandingCTA from "./sections/LandingCTA";
import LandingFooter from "./sections/LandingFooter";

export default function LandingPageModule() {
  return (
    <Box
      sx={{
        backgroundColor: LANDING_COLORS.background,
        minHeight: "100dvh",
        overflowX: "hidden",
      }}
    >
      <LandingForceDarkChrome />
      <LandingAnnouncementBar />
      <LandingNav />
      <LandingHero />
      <LandingSocialContrast />
      <LandingForBusinessDivider />
      <LandingFeatures />
      <LandingProfileShowcase />
      <LandingHowItWorks />
      <LandingAdminShowcase />
      <LandingGallery />
      <LandingMobileApps />
      <LandingCTA />
      <LandingFooter />
    </Box>
  );
}
