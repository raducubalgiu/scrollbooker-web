import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import {
  Box,
  ButtonBase,
  Checkbox,
  Stack,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";
import { SlotTimeRange } from "./SlotTimeRange";

type CalendarAvailableSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
  isBlocking: boolean;
  isSelected: boolean;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
  onSelectFreeSlot: (
    startLocale: string,
    endLocale: string,
    startUtc: string,
    endUtc: string
  ) => void;
};

const CalendarAvailableSlot = ({
  slot,
  globalSx,
  isBlocking,
  isSelected,
  onToggleSelectSlot,
  onSelectFreeSlot,
}: CalendarAvailableSlotProps) => {
  return (
    <Box sx={globalSx}>
      <ButtonBase
        onClick={() => {
          if (isBlocking) {
            onToggleSelectSlot(slot);
          } else {
            onSelectFreeSlot(
              slot.start_date_locale,
              slot.end_date_locale,
              slot.start_date_utc,
              slot.end_date_utc
            );
          }
        }}
        sx={styles.button(isBlocking, isSelected)}
      >
        {isBlocking ? (
          <Checkbox
            checked={isSelected}
            color="error"
            size="medium"
            sx={styles.checkbox}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onToggleSelectSlot(slot)}
          />
        ) : (
          <Stack
            className="hover-content"
            spacing={0.5}
            alignItems="center"
            sx={styles.hoverContentStack}
          >
            <SlotTimeRange
              startLocale={slot.start_date_locale}
              endLocale={slot.end_date_locale}
              sx={styles.timeText}
            />
            <Typography variant="caption" sx={styles.actionText}>
              Adaugă o programare
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    </Box>
  );
};

export default CalendarAvailableSlot;

const styles = {
  button: (isBlocking: boolean, isSelected: boolean) => (theme: Theme) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: 2,
    transition: "all 0.15s ease-in-out",

    backgroundColor: isBlocking
      ? isSelected
        ? "rgba(211, 47, 47, 0.04)"
        : "background.paper"
      : "transparent",

    border: "1px dashed",
    borderColor: isBlocking && isSelected ? "error.main" : "divider",
    borderStyle: isBlocking && isSelected ? "solid" : "dashed",

    "&:hover": {
      borderStyle: "dashed",
      borderColor: isBlocking
        ? isSelected
          ? "error.dark"
          : "text.secondary"
        : "primary.main",

      backgroundColor: isBlocking
        ? "action.hover"
        : theme.palette.mode === "light"
          ? `color-mix(in srgb, ${theme.palette.action.hover} 12%, #ffffff)`
          : `color-mix(in srgb, ${theme.palette.action.hover} 5%, #1e1e1e)`,

      "& .hover-content": {
        opacity: isBlocking ? 0 : 1,
        transform: isBlocking ? "translateY(6px)" : "translateY(0)",
      },
    },
  }),

  checkbox: {
    p: 0,
    "& .MuiSvgIcon-root": { fontSize: 24 },
  },

  hoverContentStack: {
    opacity: 0,
    transform: "translateY(6px)",
    transition: "all 0.2s ease-in-out",
    userSelect: "none",
  },

  timeText: {
    fontWeight: 700,
    fontSize: "13px",
    color: "text.primary",
    whiteSpace: "nowrap",
  },

  actionText: {
    fontWeight: 600,
    fontSize: "11px",
    color: "primary.main",
    whiteSpace: "nowrap",
  },
};
