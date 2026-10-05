"use client";

import { memo } from "react";
import { Box, ButtonBase, LinearProgress, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

type ReviewSummaryCheckboxProps = {
  rating: number;
  progress: number; // 0..1
  count: number;
  isEnabled: boolean;
  isChecked: boolean;
  onTap: () => void;
};

const ReviewSummaryCheckbox = ({
  rating,
  progress,
  count,
  isEnabled,
  isChecked,
  onTap,
}: ReviewSummaryCheckboxProps) => (
  <ButtonBase
    role="checkbox"
    aria-checked={isChecked}
    aria-label={`${rating} stele, ${count} recenzii`}
    disabled={!isEnabled}
    onClick={onTap}
    disableRipple
    sx={styles.row}
  >
    <Box
      sx={{
        ...styles.box,
        bgcolor: !isEnabled
          ? "divider"
          : isChecked
            ? "primary.main"
            : "transparent",
        borderColor: isEnabled && isChecked ? "primary.main" : "divider",
      }}
    >
      {isChecked && (
        <CheckRoundedIcon sx={{ fontSize: 14, color: "common.white" }} />
      )}
    </Box>

    <Typography sx={styles.rating}>{rating}</Typography>

    <LinearProgress
      variant="determinate"
      value={Math.min(Math.max(progress, 0), 1) * 100}
      sx={styles.bar}
    />

    <Typography sx={styles.count}>{count}</Typography>
  </ButtonBase>
);

export default memo(ReviewSummaryCheckbox);

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    gap: 1.25,
    width: "100%",
    py: 0.25,
    borderRadius: 1,
    textAlign: "left",
    "&.Mui-disabled": { pointerEvents: "auto", cursor: "default" },
    "&:focus-visible": { outline: "2px solid", outlineColor: "primary.main" },
  },
  box: {
    width: 18,
    height: 18,
    flexShrink: 0,
    boxSizing: "border-box",
    border: 1,
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.15s ease, border-color 0.15s ease",
  },
  rating: {
    width: 16,
    flexShrink: 0,
    textAlign: "right",
    fontWeight: 700,
  },
  bar: {
    flex: 1,
    height: 5,
    borderRadius: "2px",
    bgcolor: (theme: Theme) =>
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.2)"
        : "rgba(0,0,0,0.12)",
    "& .MuiLinearProgress-bar": {
      borderRadius: "2px",
      bgcolor: "primary.main",
    },
  },
  count: {
    width: 35,
    flexShrink: 0,
    textAlign: "right",
    fontWeight: 700,
  },
} satisfies Record<string, SxProps<Theme>>;
