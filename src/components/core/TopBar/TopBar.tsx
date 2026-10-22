"use client";

import { ReactNode } from "react";
import { Box, useTheme } from "@mui/material";
import NextLink from "next/link";
import AppLogo from "@/components/core/Logo/AppLogo";
import { AppRoutes } from "@/utils/routes";

type TopBarProps = {
  rightContent?: ReactNode;
};

export default function TopBar({ rightContent }: TopBarProps) {
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
        href={AppRoutes.home()}
        sx={{ display: "inline-flex", lineHeight: 0 }}
      >
        <AppLogo height={26} color={theme.palette.text.primary} />
      </Box>

      {rightContent}
    </Box>
  );
}
