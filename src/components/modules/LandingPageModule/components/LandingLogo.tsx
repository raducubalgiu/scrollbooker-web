import AppLogo from "@/components/core/Logo/AppLogo";

type LandingLogoProps = {
  height?: number;
};

export default function LandingLogo({ height = 32 }: LandingLogoProps) {
  return <AppLogo height={height} color="#FFFFFF" />;
}
