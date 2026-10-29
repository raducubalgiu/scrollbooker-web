"use client";

import React from "react";
import NextLink from "next/link";
import { Button, Stack } from "@mui/material";
import AuthLayout from "@/components/modules/AuthModule/AuthLayout";
import AuthHeading from "@/components/modules/AuthModule/AuthHeading";

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
    <AuthLayout>
      <AuthHeading title={title} subtitle={subtitle} />

      {children}

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: "auto", pt: 3 }}
      >
        <Button
          component={NextLink}
          href={footerHref}
          sx={{ textTransform: "none", fontWeight: 600, px: 1.5 }}
        >
          {footerLinkText}
        </Button>
      </Stack>
    </AuthLayout>
  );
}
