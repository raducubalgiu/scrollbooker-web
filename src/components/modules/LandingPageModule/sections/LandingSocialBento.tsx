"use client";

import { alpha, Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import LandingVideo from "../components/LandingVideo";

type SocialItem = { title: string; description: string };

const ICONS = [
  FavoriteRoundedIcon,
  SendRoundedIcon,
  BookmarkRoundedIcon,
  PersonAddAlt1RoundedIcon,
];

export default function LandingSocialBento() {
  const t = useTranslations("social");
  const tHero = useTranslations("hero");
  const { palette } = useTheme();
  const items = t.raw("items") as SocialItem[];
  const smallItems = items.slice(0, ICONS.length);
  const reviewItem = items[ICONS.length];
  const iconColors = [
    palette.secondary.main,
    palette.primary.main,
    palette.rating.main,
    palette.secondary.main,
  ];

  const tileSx = {
    position: "relative",
    overflow: "hidden",
    borderRadius: 4,
    border: `1px solid ${palette.divider}`,
    backgroundColor: palette.surface.main,
    p: { xs: 2.5, md: 3.5 },
    transition: "transform 0.2s, border-color 0.2s",
    "&:hover": {
      transform: "translateY(-4px) rotate(-0.5deg)",
      borderColor: alpha(palette.secondary.main, 0.4),
    },
  };

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: 6, maxWidth: 720 }}>
          <Typography
            variant="overline"
            sx={{
              color: palette.secondary.main,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            {t("kicker")}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: palette.text.primary,
              fontWeight: 900,
              letterSpacing: "-0.03em",
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: palette.text.secondary, fontSize: "1.1rem" }}
          >
            {t("subtitle")}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
          }}
        >
          <Box
            sx={{
              ...tileSx,
              gridColumn: "span 2",
              gridRow: { md: "span 2" },
              minHeight: { xs: 380, md: 440 },
              border: "none",
              background: `linear-gradient(135deg, ${palette.primary.main} 0%, ${palette.secondary.main} 100%)`,
              color: palette.common.white,
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "inline-flex",
                px: 2,
                py: 0.75,
                mb: 3,
                borderRadius: 50,
                backgroundColor: alpha(palette.common.black, 0.2),
                fontWeight: 800,
                fontSize: "0.9rem",
              }}
            >
              <Box component="span">Explore</Box>
              <Box component="span" sx={{ opacity: 0.6 }}>
                Following
              </Box>
            </Stack>
            <Typography
              sx={{
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: { xs: "100%", md: "55%" },
                mb: 1.5,
              }}
            >
              {t("feed.title")}
            </Typography>
            <Typography
              sx={{
                opacity: 0.9,
                maxWidth: { xs: "62%", md: "50%" },
                lineHeight: 1.6,
              }}
            >
              {t("feed.description")}
            </Typography>

            <Box
              sx={{
                position: "absolute",
                right: { xs: -20, md: 24 },
                bottom: { xs: -60, md: -40 },
                width: { xs: 150, md: 200 },
                aspectRatio: "1170 / 2532",
                borderRadius: "24px",
                overflow: "hidden",
                border: "6px solid #0d0d0d",
                transform: "rotate(8deg)",
                boxShadow: `0 30px 60px -20px ${alpha(palette.common.black, 0.5)}`,
              }}
            >
              <LandingVideo
                src="/landing/videos/feed.mp4"
                poster="/landing/videos/feed-poster.jpg"
                label={tHero("imageAlt")}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "1.1%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "46%",
                  height: "4.6%",
                  borderRadius: 50,
                  backgroundColor: palette.common.black,
                }}
              />
            </Box>
          </Box>

          {smallItems.map((item, index) => {
            const Icon = ICONS[index]!;
            const color = iconColors[index]!;

            return (
              <Box key={item.title} sx={tileSx}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2.5,
                    color,
                    backgroundColor: alpha(color, 0.14),
                  }}
                >
                  <Icon />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: palette.text.primary,
                    fontWeight: 800,
                    mb: 0.75,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: palette.text.secondary, lineHeight: 1.6 }}
                >
                  {item.description}
                </Typography>
              </Box>
            );
          })}

          {reviewItem && (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 3 }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              sx={{
                ...tileSx,
                gridColumn: { xs: "span 2", md: "span 4" },
                border: "none",
                backgroundColor: palette.text.primary,
                color: palette.background.default,
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "18px",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: palette.common.white,
                  background: `linear-gradient(135deg, ${palette.secondary.main}, ${palette.primary.main})`,
                }}
              >
                <VideocamRoundedIcon />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: { xs: "1.35rem", md: "1.6rem" },
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {reviewItem.title}
                </Typography>
                <Typography sx={{ opacity: 0.75 }}>
                  {reviewItem.description}
                </Typography>
              </Box>
              <Stack direction="row" spacing={0.25}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarRoundedIcon
                    key={index}
                    sx={{ color: palette.rating.main, fontSize: 28 }}
                  />
                ))}
              </Stack>
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}
