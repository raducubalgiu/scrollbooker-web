"use client";

import React from "react";
import { Box, Stack, Switch, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

type FeedFilterVideoReviewsToggleProps = {
  checked: boolean;
  onToggle: () => void;
};

const FeedFilterVideoReviewsToggle = ({
  checked,
  onToggle,
}: FeedFilterVideoReviewsToggleProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={onToggle}
      sx={[styles.container, checked && styles.containerChecked]}
    >
      {checked ? (
        <VideocamIcon sx={styles.iconActive} />
      ) : (
        <VideocamOutlinedIcon sx={styles.icon} />
      )}

      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" fontWeight={600} sx={styles.title}>
          Doar recenzii video
        </Typography>
        <Typography variant="caption" sx={styles.description}>
          Filtrează conținutul video după preferințele tale
        </Typography>
      </Box>

      <Switch checked={checked} onChange={onToggle} color="primary" />
    </Stack>
  );
};

export default FeedFilterVideoReviewsToggle;

const styles = {
  container: {
    p: 2,
    borderRadius: 2,
    cursor: "pointer",
    bgcolor: "action.hover",
  },
  containerChecked: {
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
  },
  icon: { color: "text.secondary" },
  iconActive: { color: "primary.main" },
  title: { color: "text.primary" },
  description: { color: "text.secondary" },
} as const;
