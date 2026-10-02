import { Box } from "@mui/material";
import { LANDING_COLORS } from "./landing.constants";
import LandingForceDarkChrome from "./components/LandingForceDarkChrome";
import LandingAnnouncementBar from "./sections/LandingAnnouncementBar";
import LandingNav from "./sections/LandingNav";
import LandingHero from "./sections/LandingHero";
import LandingForBusinessTeaser from "./sections/LandingForBusinessTeaser";
import LandingSocialContrast from "./sections/LandingSocialContrast";
import LandingProfileShowcase from "./sections/LandingProfileShowcase";
import LandingBookingDemo from "./sections/LandingBookingDemo";
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
      <LandingForBusinessTeaser />
      <LandingSocialContrast />
      <LandingProfileShowcase />
      <LandingBookingDemo />
      <LandingGallery />
      <LandingMobileApps />
      <LandingCTA />
      <LandingFooter />
    </Box>
  );
}
