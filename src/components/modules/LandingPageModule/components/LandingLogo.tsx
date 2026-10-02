"use client";

import AppLogo from "@/components/core/Logo/AppLogo";
import { useLandingColors } from "../LandingThemeContext";

type LandingLogoProps = {
  height?: number;
  // Opțional — doar pentru folosire în afara paginilor cu toggle de temă
  // (ex. GetStartedModule, care rămâne fix pe varianta light), ca să nu
  // depindă de ThemeModeProvider-ul real.
  color?: string;
};

export default function LandingLogo({ height = 32, color }: LandingLogoProps) {
  const LANDING_COLORS = useLandingColors();

  return <AppLogo height={height} color={color ?? LANDING_COLORS.textPrimary} />;
}
