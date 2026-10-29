"use client";

import { useTheme } from "@mui/material";
import AppLogo from "@/components/core/Logo/AppLogo";

type LandingLogoProps = {
  height?: number;
  color?: string;
};

export default function LandingLogo({ height = 32, color }: LandingLogoProps) {
  const { palette } = useTheme();

  return <AppLogo height={height} color={color ?? palette.text.primary} />;
}
