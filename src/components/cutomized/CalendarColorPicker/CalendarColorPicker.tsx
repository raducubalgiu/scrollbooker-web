"use client";

import React from "react";
import { Box, ButtonBase, Stack, Theme, Tooltip, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import {
  CALENDAR_COLORS,
  CALENDAR_COLOR_LABELS,
  CalendarColorEnum,
} from "@/ts/enums/CalendarColorEnum";

type CalendarColorPickerProps = {
  value: CalendarColorEnum | null;
  onChange: (color: CalendarColorEnum | null) => void;
  noneLabel?: string;
  disabled?: boolean;
};

const SWATCH_SIZE = 32;

const CalendarColorPicker = ({
  value,
  onChange,
  noneLabel = "Fără culoare",
  disabled = false,
}: CalendarColorPickerProps) => {
  return (
    <Stack spacing={1}>
      <Box sx={styles.swatches}>
        <Tooltip title={noneLabel}>
          <ButtonBase
            disabled={disabled}
            aria-label={noneLabel}
            onClick={() => onChange(null)}
            sx={[styles.swatch, styles.none, value === null && styles.selected]}
          >
            <BlockRoundedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          </ButtonBase>
        </Tooltip>

        {CALENDAR_COLORS.map((color) => {
          const isSelected = value === color;

          return (
            <Tooltip key={color} title={CALENDAR_COLOR_LABELS[color]}>
              <ButtonBase
                disabled={disabled}
                aria-label={CALENDAR_COLOR_LABELS[color]}
                onClick={() => onChange(color)}
                sx={[
                  styles.swatch,
                  { bgcolor: (theme: Theme) => theme.palette.calendar[color] },
                  isSelected && styles.selected,
                ]}
              >
                {isSelected && (
                  <CheckRoundedIcon sx={{ fontSize: 18, color: "common.white" }} />
                )}
              </ButtonBase>
            </Tooltip>
          );
        })}
      </Box>

      <Typography variant="caption" color="text.secondary">
        {value ? CALENDAR_COLOR_LABELS[value] : noneLabel}
      </Typography>
    </Stack>
  );
};

export default CalendarColorPicker;

const styles = {
  swatches: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  swatch: {
    width: SWATCH_SIZE,
    height: SWATCH_SIZE,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "transform 0.15s ease",
    "&:hover": { transform: "scale(1.08)" },
  },
  none: {
    border: 1,
    borderColor: "divider",
    bgcolor: "background.default",
  },
  selected: {
    outline: "2px solid",
    outlineColor: "text.primary",
    outlineOffset: 2,
  },
};
