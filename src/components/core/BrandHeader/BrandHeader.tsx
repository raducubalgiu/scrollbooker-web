"use client";

import React from "react";
import NextLink from "next/link";
import {
  alpha,
  Box,
  Container,
  ContainerProps,
  Stack,
  Theme,
  useTheme,
} from "@mui/material";
import AppLogo from "@/components/core/Logo/AppLogo";
import { AppRoutes } from "@/utils/routes";

type BrandHeaderProps = {
  action?: React.ReactNode;
  maxWidth?: ContainerProps["maxWidth"];
};

export default function BrandHeader({
  action,
  maxWidth = "lg",
}: BrandHeaderProps) {
  const theme = useTheme();

  return (
    <Box component="header" sx={styles.header}>
      <Container maxWidth={maxWidth}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: { xs: 1.5, md: 2 }, minHeight: { xs: 60, md: 70 } }}
        >
          <Box component={NextLink} href={AppRoutes.home()} sx={styles.logo}>
            <AppLogo height={26} color={theme.palette.text.primary} />
          </Box>
          {action}
        </Stack>
      </Container>
    </Box>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    flexShrink: 0,
    borderBottom: 1,
    borderColor: "divider",
    backdropFilter: "blur(12px)",
    backgroundColor: (theme: Theme) =>
      alpha(theme.palette.background.default, 0.72),
  },
  logo: {
    display: "inline-flex",
    lineHeight: 0,
    "& svg": { height: { xs: 26, md: 30 }, width: "auto" },
  },
};
