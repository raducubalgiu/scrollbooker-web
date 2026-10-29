"use client";

import NextLink from "next/link";
import { alpha, Button, ButtonProps, Theme } from "@mui/material";

type AuthGradientButtonProps = Omit<ButtonProps, "href"> & {
  href?: string;
};

export default function AuthGradientButton({
  href,
  sx,
  ...props
}: AuthGradientButtonProps) {
  const linkProps = href ? { component: NextLink, href } : {};

  return (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      {...linkProps}
      {...props}
      sx={[gradientSx, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}

const gradientSx = (theme: Theme) => ({
  py: 1.5,
  fontWeight: 800,
  borderRadius: 50,
  transition: "transform 0.15s, box-shadow 0.15s",
  "&:not(.Mui-disabled)": {
    color: theme.palette.common.white,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.accent.main})`,
    boxShadow: `0 12px 32px -10px ${alpha(theme.palette.accent.main, 0.6)}`,
  },
  "&:not(.Mui-disabled):hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 16px 40px -10px ${alpha(theme.palette.accent.main, 0.75)}`,
  },
});
