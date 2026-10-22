"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

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
          Îți vom afișa recenzii video de la clienți reali
        </Typography>
      </Box>

      <Box sx={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <CheckRoundedIcon sx={styles.checkboxIcon} />}
      </Box>
    </Stack>
  );
};

export default FeedFilterVideoReviewsToggle;

const styles = {
  container: {
    p: 2,
    borderRadius: 2.5,
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
  checkbox: {
    width: 20,
    height: 20,
    flexShrink: 0,
    boxSizing: "border-box",
    border: "1.5px solid",
    borderColor: "divider",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
  },
  checkboxChecked: {
    bgcolor: "primary.main",
    borderColor: "primary.main",
  },
  checkboxIcon: { fontSize: 14, color: "common.white" },
} as const;
