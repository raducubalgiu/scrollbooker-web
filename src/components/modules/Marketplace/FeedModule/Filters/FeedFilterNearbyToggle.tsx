"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import NearMeIcon from "@mui/icons-material/NearMe";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type FeedFilterNearbyToggleProps = {
  checked: boolean;
  hasLocationAccess: boolean;
  onToggle: () => void;
  onRequestLocationAccess: () => void;
};

const FeedFilterNearbyToggle = ({
  checked,
  hasLocationAccess,
  onToggle,
  onRequestLocationAccess,
}: FeedFilterNearbyToggleProps) => {
  const isActive = checked && hasLocationAccess;

  const handleClick = () => {
    if (hasLocationAccess) {
      onToggle();
    } else {
      onRequestLocationAccess();
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      onClick={handleClick}
      sx={[
        styles.container,
        isActive && styles.containerChecked,
        !hasLocationAccess && styles.containerDisabled,
      ]}
    >
      {isActive ? (
        <NearMeIcon sx={styles.iconActive} />
      ) : (
        <NearMeOutlinedIcon sx={styles.icon} />
      )}

      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" fontWeight={600} sx={styles.title}>
          Doar postări din zona mea
        </Typography>
        <Typography variant="caption" sx={styles.description}>
          {hasLocationAccess
            ? "Îți vom afișa postări din afaceri din apropierea ta"
            : "Permite accesul la locație pentru a activa acest filtru"}
        </Typography>
      </Box>

      <Box sx={[styles.checkbox, isActive && styles.checkboxChecked]}>
        {isActive && <CheckRoundedIcon sx={styles.checkboxIcon} />}
      </Box>
    </Stack>
  );
};

export default FeedFilterNearbyToggle;

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
  containerDisabled: {
    opacity: 0.5,
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
