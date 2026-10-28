"use client";

import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useLandingColors } from "../LandingThemeContext";
import { marqueeKeyframes, motionSafe } from "../landing.motion";

export default function LandingHashtagMarquee() {
  const t = useTranslations("marquee");
  const LANDING_COLORS = useLandingColors();
  const tags = t.raw("tags") as string[];

  return (
    <Box
      aria-hidden
      sx={{
        overflow: "hidden",
        py: { xs: 2, md: 2.5 },
        background: `linear-gradient(90deg, ${LANDING_COLORS.primary}, ${LANDING_COLORS.accent})`,
        transform: "rotate(-1.5deg) scale(1.02)",
        my: { xs: 1, md: 2 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "max-content",
          ...motionSafe(`${marqueeKeyframes} 40s linear infinite`),
        }}
      >
        {[...tags, ...tags].map((tag, index) => (
          <Typography
            key={`${tag}-${index}`}
            component="span"
            sx={{
              px: { xs: 2, md: 3 },
              fontSize: { xs: "1.25rem", md: "1.75rem" },
              fontWeight: 900,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              color: index % 2 === 0 ? "#fff" : "transparent",
              WebkitTextStroke: index % 2 === 0 ? undefined : "1.5px #fff",
            }}
          >
            {tag}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
