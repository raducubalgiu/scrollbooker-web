"use client";

import React from "react";
import {
  Box,
  Paper,
  Stack,
  Avatar,
  Typography,
  ButtonBase,
  alpha,
} from "@mui/material";
import dayjs from "dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { formatPrice } from "@/utils/formatPrice";

interface CalendarEventProps {
  slot: CalendarEventsSlot;
  minTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
  onSelectFreeSlot: (startDateUtc: string, endDateUtc: string) => void;
}

export default function CalendarEvent({
  slot,
  minTimeStr,
  slotDuration,
  rowHeight,
  onSelectFreeSlot,
}: CalendarEventProps) {
  const startOnlyStr = slot.start_date_locale.split("T")[1];
  const endOnlyStr = slot.end_date_locale.split("T")[1];

  const globalStart = dayjs(`2026-01-01T${minTimeStr}`);
  const eventStart = dayjs(`2026-01-01T${startOnlyStr}`);
  const eventEnd = dayjs(`2026-01-01T${endOnlyStr}`);

  if (!eventStart.isValid() || !eventEnd.isValid() || !globalStart.isValid())
    return null;

  const pixelsPerMinute = rowHeight / slotDuration;
  const minutesFromGlobalStart = eventStart.diff(globalStart, "minute");

  const topPositionPixels = minutesFromGlobalStart * pixelsPerMinute;
  const eventDurationMinutes = eventEnd.diff(eventStart, "minute");
  const heightPixels = eventDurationMinutes * pixelsPerMinute;

  const absolutePlacementStyles = {
    position: "absolute",
    top: `${topPositionPixels}px`,
    height: `${heightPixels}px`,
    left: 2,
    right: 2,
    zIndex: 5,
    boxSizing: "border-box",
    overflow: "hidden",
  };

  if (slot.is_blocked) {
    return (
      <Box
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor: alpha(theme.palette.error.main, 0.08),
          color: theme.palette.error.dark,
          p: 1,
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          borderLeft: "4px solid",
          borderColor: "error.main",
        })}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {slot.info?.message || "Slot Blocat"}
        </Typography>
      </Box>
    );
  }

  if (slot.is_booked) {
    return (
      <Paper
        elevation={1}
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor: alpha(theme.palette.primary.main, 0.12),
          color: theme.palette.text.primary,
          p: 1,
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: 4,
          borderColor: "primary.main",
        })}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar
            src={slot.info?.customer?.avatar || ""}
            alt={slot.info?.customer?.fullname ?? ""}
            sx={{
              width: 24,
              height: 24,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "10px",
            }}
          >
            {slot.info?.customer?.fullname?.substring(0, 2).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.1,
              }}
            >
              {slot.info?.customer?.fullname}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: "10px",
                opacity: 0.8,
                display: "block",
                mt: 0.25,
              }}
            >
              {formatPrice(slot.info?.total_price_with_discount)}
              {slot.info?.payment_currency?.name}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        ...absolutePlacementStyles,
        backgroundColor: slot.is_last_minute
          ? "rgba(76, 175, 80, 0.04)"
          : "transparent",
        borderRadius: 1,
      }}
    >
      <ButtonBase
        onClick={() => onSelectFreeSlot(slot.start_date_utc, slot.end_date_utc)}
        sx={{
          width: "100%",
          height: "100%",
          transition: "background-color 0.15s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&:hover": {
            backgroundColor: slot.is_last_minute
              ? "rgba(76, 175, 80, 0.12)"
              : "action.hover",
          },
        }}
      >
        {slot.is_last_minute && slot.last_minute_discount && (
          <Typography
            variant="caption"
            sx={{ color: "success.main", fontWeight: "bold", fontSize: "10px" }}
          >
            -{slot.last_minute_discount}% OFF
          </Typography>
        )}
      </ButtonBase>
    </Box>
  );
}
