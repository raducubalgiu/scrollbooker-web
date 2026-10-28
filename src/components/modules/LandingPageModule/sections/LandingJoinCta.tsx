"use client";

import {
  alpha,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { AppRoutes } from "@/utils/routes";
import { trackLoginCtaClick, trackRegisterCtaClick } from "@/utils/analytics";
import { useLandingColors } from "../LandingThemeContext";
import { floatKeyframes, motionSafe } from "../landing.motion";

const DECORATIONS = [
  { Icon: FavoriteRoundedIcon, top: "12%", left: "6%", size: 56, delay: 0 },
  { Icon: BookmarkRoundedIcon, top: "18%", right: "8%", size: 44, delay: 1 },
  { Icon: SendRoundedIcon, bottom: "14%", left: "12%", size: 40, delay: 2 },
  {
    Icon: FavoriteRoundedIcon,
    bottom: "10%",
    right: "14%",
    size: 36,
    delay: 1.5,
  },
];

export default function LandingJoinCta() {
  const t = useTranslations("joinCta");
  const LANDING_COLORS = useLandingColors();

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
            color: "#fff",
            background: `linear-gradient(135deg, ${LANDING_COLORS.primary} 0%, ${LANDING_COLORS.accent} 100%)`,
          }}
        >
          {DECORATIONS.map(({ Icon, size, delay, ...position }, index) => (
            <Icon
              key={index}
              aria-hidden
              sx={{
                position: "absolute",
                ...position,
                fontSize: size,
                color: alpha("#fff", 0.22),
                display: { xs: index > 1 ? "none" : "block", md: "block" },
                ...motionSafe(
                  `${floatKeyframes} 5s ease-in-out ${delay}s infinite`,
                ),
              }}
            />
          ))}

          <Stack spacing={3} alignItems="center" sx={{ position: "relative" }}>
            <Typography
              variant="overline"
              sx={{ fontWeight: 800, letterSpacing: 1.5, opacity: 0.85 }}
            >
              {t("kicker")}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "2.25rem", md: "3.5rem" },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                maxWidth: 720,
              }}
            >
              {t("title")}
            </Typography>
            <Typography
              sx={{
                maxWidth: 520,
                fontWeight: 500,
                fontSize: "1.1rem",
                opacity: 0.9,
              }}
            >
              {t("subtitle")}
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              <Button
                component={Link}
                href={AppRoutes.register()}
                onClick={() =>
                  trackRegisterCtaClick("home_join_cta", AppRoutes.register())
                }
                variant="contained"
                size="large"
                disableElevation
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  backgroundColor: "#fff",
                  color: "#111",
                  fontWeight: 800,
                  borderRadius: 50,
                  "&:hover": { backgroundColor: alpha("#fff", 0.9) },
                }}
              >
                {t("primary")}
              </Button>
              <Button
                component={Link}
                href={AppRoutes.login()}
                onClick={() => trackLoginCtaClick("home_join_cta")}
                variant="outlined"
                size="large"
                sx={{
                  color: "#fff",
                  borderColor: alpha("#fff", 0.6),
                  fontWeight: 700,
                  borderRadius: 50,
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: alpha("#fff", 0.1),
                  },
                }}
              >
                {t("secondary")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
