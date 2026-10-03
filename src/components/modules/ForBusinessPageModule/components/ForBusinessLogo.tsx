"use client";

import Image from "next/image";
import ForBusinessLogoBlack from "@/assets/logo/for_business_logo_black.svg";
import ForBusinessLogoWhite from "@/assets/logo/for_business_logo_white.svg";
import { useLandingTheme } from "@/components/modules/LandingPageModule/LandingThemeContext";

type ForBusinessLogoProps = {
  height?: number;
};

export default function ForBusinessLogo({ height = 40 }: ForBusinessLogoProps) {
  const { mode } = useLandingTheme();
  const src = mode === "dark" ? ForBusinessLogoWhite : ForBusinessLogoBlack;
  const width = height * (ForBusinessLogoBlack.width / ForBusinessLogoBlack.height);

  return (
    <Image
      src={src}
      alt="ScrollBooker for Business"
      height={height}
      width={width}
      priority
    />
  );
}
