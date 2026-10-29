"use client";

import React from "react";
import NextLink from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import TopBar from "@/components/core/TopBar/TopBar";
import PageGlow from "@/components/core/PageGlow/PageGlow";

type AuthPageShellProps = {
  title: string;
  subtitle: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
};

export default function AuthPageShell({
  title,
  subtitle,
  footerLinkText,
  footerHref,
  children,
}: AuthPageShellProps) {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageGlow />

      <TopBar />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          py: { xs: 3, md: 10 },
          px: 1,
        }}
      >
        <Container
          maxWidth="sm"
          sx={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Stack
            spacing={0.75}
            sx={{ mb: 5, textAlign: { xs: "left", md: "center" } }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800 }}>
              {title}
            </Typography>
            <Typography color="text.secondary">{subtitle}</Typography>
          </Stack>

          {children}

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: "auto", borderTop: 1, borderColor: "divider", pt: 1 }}
          >
            <Button
              component={NextLink}
              href={footerHref}
              sx={{ textTransform: "none", fontWeight: 600, px: 1.5 }}
            >
              {footerLinkText}
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
