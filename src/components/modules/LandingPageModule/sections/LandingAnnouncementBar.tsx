"use client";

import { alpha, Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { AppRoutes } from "@/utils/routes";
import { LANDING_COLORS } from "../landing.constants";

export default function LandingAnnouncementBar() {
  const t = useTranslations("announcementBar");

  return (
    <Box
      component={Link}
      href={AppRoutes.partners()}
      sx={{
        display: "block",
        textDecoration: "none",
        borderBottom: `1px solid ${LANDING_COLORS.border}`,
        transition: "background-color 0.15s",
        "&:hover": { backgroundColor: alpha(LANDING_COLORS.textPrimary, 0.03) },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          sx={{ py: 1, px: 1, textAlign: "center" }}
        >
          <Typography
            variant="body2"
            sx={{ color: LANDING_COLORS.textSecondary, fontWeight: 500 }}
          >
            {t("message")}
          </Typography>
          <Stack
            direction="row"
            spacing={0.25}
            alignItems="center"
            sx={{ color: LANDING_COLORS.primary, fontWeight: 600, flexShrink: 0 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {t("cta")}
            </Typography>
            <ArrowForwardRoundedIcon sx={{ fontSize: 16 }} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
