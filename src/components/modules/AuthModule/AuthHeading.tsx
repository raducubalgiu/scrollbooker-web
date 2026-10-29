"use client";

import { alpha, Box, Stack, Theme, Typography } from "@mui/material";

type AuthHeadingProps = {
  title: string;
  subtitle: string;
  kicker?: string;
};

export default function AuthHeading({ title, subtitle, kicker }: AuthHeadingProps) {
  return (
    <Stack spacing={1.5} sx={{ mb: { xs: 4, md: 5 } }}>
      {kicker && (
        <Box sx={styles.kicker}>
          <Box sx={styles.kickerDot} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {kicker}
          </Typography>
        </Box>
      )}
      <Typography component="h1" sx={styles.title}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={styles.subtitle}>
        {subtitle}
      </Typography>
    </Stack>
  );
}

const styles = {
  kicker: {
    display: "inline-flex",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 1,
    px: 1.75,
    py: 0.75,
    borderRadius: 50,
    border: 1,
    borderColor: (theme: Theme) => alpha(theme.palette.accent.main, 0.35),
    bgcolor: (theme: Theme) => alpha(theme.palette.accent.main, 0.08),
  },
  kickerDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    bgcolor: "accent.main",
  },
  title: {
    fontSize: { xs: "2.25rem", md: "2.75rem" },
    fontWeight: 900,
    lineHeight: 1.05,
    letterSpacing: "-0.04em",
  },
  subtitle: {
    fontSize: { xs: "1rem", md: "1.05rem" },
    lineHeight: 1.6,
  },
};
