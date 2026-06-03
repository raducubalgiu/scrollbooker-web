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
import dayjs from "dayjs";
import React from "react";

type CalendarAvailableSlotProps = {
  slot: CalendarEventsSlot;
  globalSx: SxProps<Theme>;
  isBlocking: boolean;
  isSelected: boolean;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
  onSelectFreeSlot: (start: string, end: string) => void;
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
            onSelectFreeSlot(slot.start_date_utc, slot.end_date_utc);
          }
        }}
        sx={(theme) => ({
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
        })}
      >
        {isBlocking ? (
          <Checkbox
            checked={isSelected}
            color="error"
            size="medium"
            sx={{
              p: 0,
              "& .MuiSvgIcon-root": { fontSize: 24 },
            }}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onToggleSelectSlot(slot)}
          />
        ) : (
          <Stack
            className="hover-content"
            spacing={0.5}
            alignItems="center"
            sx={{
              opacity: 0,
              transform: "translateY(6px)",
              transition: "all 0.2s ease-in-out",
              userSelect: "none",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: "13px",
                color: "text.primary",
                whiteSpace: "nowrap",
              }}
            >
              {dayjs(slot.start_date_locale).format("HH:mm")} -{" "}
              {dayjs(slot.end_date_locale).format("HH:mm")}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                fontSize: "11px",
                color: "primary.main",
                whiteSpace: "nowrap",
              }}
            >
              Adaugă o programare
            </Typography>
          </Stack>
        )}
      </ButtonBase>
    </Box>
  );
};

export default CalendarAvailableSlot;
