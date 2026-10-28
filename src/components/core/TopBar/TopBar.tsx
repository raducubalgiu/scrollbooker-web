"use client";

import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import NextLink from "next/link";
import AppLogo from "@/components/core/Logo/AppLogo";
import { AppRoutes } from "@/utils/routes";

type TopBarProps = {
  rightContent?: ReactNode;
  logoHref?: string;
};

export default function TopBar({
  rightContent,
  logoHref = AppRoutes.home(),
}: TopBarProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexShrink: 0,
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: rightContent ? "space-between" : "flex-start",
        px: { xs: 2, md: 4 },
      }}
    >
      <Box
        component={NextLink}
        href={logoHref}
        sx={{
          display: "inline-flex",
          lineHeight: 0,
          "& svg": { height: { xs: 26, md: 32 }, width: "auto" },
        }}
      >
        <AppLogo height={26} color={theme.palette.text.primary} />
      </Box>

      {rightContent}
    </Box>
  );
}
