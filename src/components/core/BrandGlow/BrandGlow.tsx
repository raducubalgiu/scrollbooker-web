"use client";

import { alpha, Box, Theme } from "@mui/material";

export default function BrandGlow() {
  return (
    <>
      <Box sx={styles.accentGlow} />
      <Box sx={styles.primaryGlow} />
    </>
  );
}

const styles = {
  accentGlow: {
    position: "absolute",
    top: "-15%",
    right: "-12%",
    width: { xs: 340, md: 620 },
    height: { xs: 340, md: 620 },
    borderRadius: "50%",
    background: (theme: Theme) =>
      `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.22)} 0%, transparent 70%)`,
    pointerEvents: "none",
  },
  primaryGlow: {
    position: "absolute",
    bottom: "-25%",
    left: "-15%",
    width: { xs: 320, md: 560 },
    height: { xs: 320, md: 560 },
    borderRadius: "50%",
    background: (theme: Theme) =>
      `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 70%)`,
    pointerEvents: "none",
  },
};
