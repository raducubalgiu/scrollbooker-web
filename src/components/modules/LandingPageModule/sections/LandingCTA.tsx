"use client";

import { alpha, Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AppRoutes } from "@/utils/routes";
import { trackRegisterCtaClick } from "@/utils/analytics";

type LandingCTAProps = {
  href?: string;
};

export default function LandingCTA({ href }: LandingCTAProps) {
  const t = useTranslations("cta");
  const { palette } = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            px: { xs: 3, md: 8 },
            py: { xs: 8, md: 10 },
            textAlign: "center",
            color: palette.common.white,
            background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.secondary.main} 100%)`,
          }}
        >
          <Stack spacing={3} alignItems="center" sx={{ position: "relative" }}>
            <Typography
              sx={{
                fontSize: { xs: "2.25rem", md: "3.25rem" },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: 720,
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: 520,
                fontWeight: 500,
                fontSize: "1.1rem",
                opacity: 0.9,
              }}
            >
              {t("subtitle")}
            </Typography>
            <Button
              component={Link}
              href={href ?? AppRoutes.forBusiness()}
              onClick={() =>
                trackRegisterCtaClick("cta", href ?? AppRoutes.forBusiness())
              }
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                backgroundColor: palette.common.white,
                color: palette.grey[900],
                fontWeight: 800,
                borderRadius: 50,
                "&:hover": { backgroundColor: alpha(palette.common.white, 0.9) },
              }}
            >
              {href ? t("button") : t("buttonForBusiness")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
