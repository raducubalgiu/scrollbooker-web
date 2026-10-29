"use client";

import { useTransition } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "@/i18n/locale";
import { locales, type Locale } from "@/i18n/config";

export default function LandingLanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("languageSwitcher");
  const { palette } = useTheme();
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: Locale) => {
    if (next === locale || isPending) return;
    startTransition(() => {
      setUserLocale(next);
    });
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 50,
        border: `1px solid ${palette.divider}`,
        p: "3px",
        opacity: isPending ? 0.6 : 1,
      }}
    >
      {locales.map((code) => {
        const isActive = code === locale;

        return (
          <Box
            key={code}
            component="button"
            type="button"
            onClick={() => handleChange(code)}
            sx={{
              border: "none",
              cursor: "pointer",
              borderRadius: 50,
              px: 1.25,
              py: 0.4,
              backgroundColor: isActive ? palette.primary.main : "transparent",
              transition: "background-color 0.15s",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                fontSize: "0.7rem",
                color: isActive ? palette.common.black : palette.text.secondary,
              }}
            >
              {t(code)}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
