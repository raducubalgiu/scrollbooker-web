import AppLogo from "@/components/core/Logo/AppLogo";
import { LANDING_COLORS } from "../landing.constants";

type LandingLogoProps = {
  height?: number;
};

export default function LandingLogo({ height = 32 }: LandingLogoProps) {
  return <AppLogo height={height} color={LANDING_COLORS.textPrimary} />;
}
