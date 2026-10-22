"use client";

import React from "react";
import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type FeedFilterServiceChipProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

const FeedFilterServiceChip = ({
  label,
  isSelected,
  onClick,
}: FeedFilterServiceChipProps) => {
  return (
    <Chip
      label={label}
      onClick={onClick}
      {...(isSelected ? { icon: <CheckIcon sx={styles.checkIcon} /> } : {})}
      sx={[styles.chip, isSelected && styles.chipSelected]}
    />
  );
};

export default FeedFilterServiceChip;

const styles = {
  chip: {
    fontWeight: 600,
    bgcolor: "action.selected",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
    "&:hover": {
      bgcolor: "action.hover",
    },
  },
  chipSelected: {
    bgcolor: "primary.main",
    color: "white",
    borderColor: "primary.main",
    "&:hover": {
      bgcolor: "primary.main",
    },
  },
  checkIcon: {
    fontSize: 16,
    color: "white",
  },
} as const;
