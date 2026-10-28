import { alpha, Box, SxProps, Theme } from "@mui/material";
import { useLandingColors } from "../LandingThemeContext";
import { floatKeyframes, motionSafe } from "../landing.motion";

type FloatingReactionProps = {
  children: React.ReactNode;
  delay?: number;
  variant?: "default" | "primary";
  sx?: SxProps<Theme>;
};

export default function FloatingReaction({
  children,
  delay = 0,
  variant = "default",
  sx,
}: FloatingReactionProps) {
  const LANDING_COLORS = useLandingColors();
  const isPrimary = variant === "primary";

  return (
    <Box
      aria-hidden
      sx={[
        {
          position: "absolute",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,
          px: { xs: 1.25, md: 1.5 },
          py: { xs: 0.6, md: 0.8 },
          borderRadius: 50,
          whiteSpace: "nowrap",
          fontWeight: 700,
          fontSize: { xs: "0.75rem", md: "0.875rem" },
          color: isPrimary ? "#fff" : LANDING_COLORS.textPrimary,
          backgroundColor: isPrimary
            ? LANDING_COLORS.primary
            : alpha(LANDING_COLORS.background, 0.9),
          border: `1px solid ${isPrimary ? LANDING_COLORS.primary : LANDING_COLORS.border}`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 12px 32px -12px ${alpha(isPrimary ? LANDING_COLORS.primary : "#000", 0.45)}`,
          ...motionSafe(`${floatKeyframes} 4s ease-in-out ${delay}s infinite`),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
