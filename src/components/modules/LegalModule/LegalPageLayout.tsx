"use client";

import React from "react";
import { Box, Container, Typography } from "@mui/material";
import TopBar from "@/components/core/TopBar/TopBar";
import LandingFooter from "@/components/modules/LandingPageModule/sections/LandingFooter";
import LandingLanguageSwitcher from "@/components/modules/LandingPageModule/components/LandingLanguageSwitcher";

type LegalPageLayoutProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

const LegalPageLayout = ({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) => {
  return (
    <Box sx={styles.page}>
      <Box sx={styles.topBar}>
        <TopBar rightContent={<LandingLanguageSwitcher />} />
      </Box>

      <Container component="main" maxWidth="md" sx={styles.main}>
        <Typography variant="h1" sx={styles.title}>
          {title}
        </Typography>
        <Typography variant="body2" sx={styles.lastUpdated}>
          {lastUpdated}
        </Typography>
        {children}
      </Container>

      <LandingFooter displayLogin />
    </Box>
  );
};

export default LegalPageLayout;

const styles = {
  page: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.default",
  },
  topBar: {
    borderBottom: "1px solid",
    borderColor: "divider",
  },
  main: {
    flex: 1,
    py: { xs: 4, md: 8 },
  },
  title: {
    fontWeight: 800,
    letterSpacing: "-0.02em",
    mb: 1,
  },
  lastUpdated: {
    color: "text.secondary",
    mb: { xs: 4, md: 6 },
  },
};
