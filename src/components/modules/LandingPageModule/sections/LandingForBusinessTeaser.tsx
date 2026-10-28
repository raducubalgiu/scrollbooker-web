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
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";
import { AppRoutes } from "@/utils/routes";

type TeaserItem = { title: string; description: string };

const ICONS = [VideocamRoundedIcon, PlaceRoundedIcon, PeopleAltRoundedIcon];

export default function LandingForBusinessTeaser() {
  const t = useTranslations("forBusinessTeaser");
  const LANDING_COLORS = useLandingColors();
  const items = t.raw("items") as TeaserItem[];

  return (
    <Box component="section" id="business" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 6,
            border: `1px solid ${LANDING_COLORS.border}`,
            backgroundColor: LANDING_COLORS.surface,
            px: { xs: 3, md: 6 },
            py: { xs: 5, md: 7 },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "-40%",
              right: "-10%",
              width: { xs: 320, md: 520 },
              height: { xs: 320, md: 520 },
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(LANDING_COLORS.primary, 0.22)} 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 3, md: 6 }}
            alignItems={{ xs: "flex-start", md: "flex-end" }}
            justifyContent="space-between"
            sx={{ position: "relative", mb: { xs: 5, md: 6 } }}
          >
            <Box sx={{ maxWidth: 640 }}>
              <Typography
                variant="overline"
                sx={{
                  color: LANDING_COLORS.primary,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                }}
              >
                {t("kicker")}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: LANDING_COLORS.textPrimary,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  mt: 1.5,
                  mb: 2,
                }}
              >
                {t("title")}
              </Typography>
              <Typography
                sx={{ color: LANDING_COLORS.textSecondary, fontSize: "1.1rem" }}
              >
                {t("subtitle")}
              </Typography>
            </Box>

            <Button
              component={Link}
              href={AppRoutes.forBusiness()}
              variant="contained"
              size="large"
              disableElevation
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                flexShrink: 0,
                whiteSpace: "nowrap",
                borderRadius: 50,
                fontWeight: 800,
                color: "#fff",
                backgroundColor: LANDING_COLORS.primary,
                "&:hover": { backgroundColor: LANDING_COLORS.primaryDark },
              }}
            >
              {t("button")}
            </Button>
          </Stack>

          <Box
            sx={{
              position: "relative",
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            }}
          >
            {items.map((item, index) => {
              const Icon = ICONS[index] ?? VideocamRoundedIcon;

              return (
                <Box
                  key={item.title}
                  sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: 4,
                    border: `1px solid ${LANDING_COLORS.border}`,
                    backgroundColor: LANDING_COLORS.background,
                    transition: "transform 0.2s, border-color 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: alpha(LANDING_COLORS.primary, 0.5),
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2.5 }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        background: `linear-gradient(135deg, ${LANDING_COLORS.primary}, ${LANDING_COLORS.accent})`,
                      }}
                    >
                      <Icon />
                    </Box>
                    <Typography
                      sx={{
                        color: alpha(LANDING_COLORS.textPrimary, 0.12),
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="h6"
                    sx={{
                      color: LANDING_COLORS.textPrimary,
                      fontWeight: 800,
                      mb: 0.75,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: LANDING_COLORS.textSecondary,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
