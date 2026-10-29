"use client";

import React from "react";
import { Box } from "@mui/material";
import BrandGlow from "@/components/core/BrandGlow/BrandGlow";
import BrandHeader from "@/components/core/BrandHeader/BrandHeader";
import {
  fadeUpKeyframes,
  motionSafe,
} from "@/components/modules/LandingPageModule/landing.motion";

type AuthLayoutProps = {
  children: React.ReactNode;
  headerAction?: React.ReactNode;
};

export default function AuthLayout({ children, headerAction }: AuthLayoutProps) {
  return (
    <Box sx={styles.root}>
      <BrandGlow />

      <BrandHeader action={headerAction} />

      <Box component="main" sx={styles.main}>
        <Box sx={styles.content}>{children}</Box>
      </Box>
    </Box>
  );
}

const styles = {
  root: {
    position: "relative",
    overflow: "hidden",
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.default",
  },
  main: {
    position: "relative",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    px: 2,
    pt: { xs: 4, md: 9 },
    pb: { xs: 3, md: 6 },
  },
  content: {
    width: "100%",
    maxWidth: 460,
    display: "flex",
    flexDirection: "column",
    ...motionSafe(
      `${fadeUpKeyframes} 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both`,
    ),
  },
};
