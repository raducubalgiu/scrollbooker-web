import { alpha, Box, SxProps, Theme, useTheme } from "@mui/material";
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
  const { palette } = useTheme();
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
          color: isPrimary ? palette.common.white : palette.text.primary,
          backgroundColor: isPrimary
            ? palette.primary.main
            : alpha(palette.background.default, 0.9),
          border: `1px solid ${isPrimary ? palette.primary.main : palette.divider}`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 12px 32px -12px ${alpha(isPrimary ? palette.primary.main : palette.common.black, 0.45)}`,
          ...motionSafe(`${floatKeyframes} 4s ease-in-out ${delay}s infinite`),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
