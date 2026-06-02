"use client";

import React from "react";
import { Box, Stack, Typography, ButtonBase } from "@mui/material";
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

  const hasSpacing = slot.is_booked || slot.is_blocked || slot.is_last_minute;

  const absolutePlacementStyles = {
    position: "absolute",
    top: `${topPositionPixels}px`,
    height: `${heightPixels}px`,
    left: hasSpacing ? 2 : 0,
    right: hasSpacing ? 2 : 0,
    zIndex: 5,
    boxSizing: "border-box",
    overflow: "hidden",
  };

  if (slot.is_blocked) {
    return (
      <Box
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor: (theme) => {
            const primaryColor = theme.palette.error.main;
            const isLight = theme.palette.mode === "light";

            return isLight
              ? `color-mix(in srgb, ${primaryColor} 12%, #ffffff)`
              : `color-mix(in srgb, ${primaryColor} 5%, #1e1e1e)`;
          },
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
      <Box
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor: (theme) => {
            const primaryColor = theme.palette.primary.main;
            const isLight = theme.palette.mode === "light";

            return isLight
              ? `color-mix(in srgb, ${primaryColor} 12%, #ffffff)`
              : `color-mix(in srgb, ${primaryColor} 5%, #1e1e1e)`;
          },
          color: theme.palette.text.primary,
          p: 1,
          borderRadius: 1,
          borderLeft: 4,
          borderColor: "primary.main",
        })}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {dayjs(slot.start_date_locale).format("HH:mm")} -{" "}
          {dayjs(slot.end_date_locale).format("HH:mm")}
        </Typography>
        <Stack direction="row" gap={1} alignItems="center" mt={0.5}>
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
      </Box>
    );
  }

  if (slot.is_last_minute) {
    return (
      <Box
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor: (theme) => {
            const primaryColor = "#40E0D0";
            const isLight = theme.palette.mode === "light";
            return isLight
              ? `color-mix(in srgb, ${primaryColor} 12%, #ffffff)`
              : `color-mix(in srgb, ${primaryColor} 5%, #1e1e1e)`;
          },
          color: theme.palette.text.primary,
          p: 1,
          borderRadius: 1,
          borderLeft: 4,
          borderColor: "#40E0D0",
        })}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {dayjs(slot.start_date_locale).format("HH:mm")} -{" "}
          {dayjs(slot.end_date_locale).format("HH:mm")}
        </Typography>
        <Box sx={{ overflow: "hidden", mt: 0.5 }}>
          <Typography
            variant="caption"
            sx={{ color: "success.main", fontWeight: "bold", fontSize: "10px" }}
          >
            -{slot.last_minute_discount}% OFF
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={absolutePlacementStyles}>
      <ButtonBase
        onClick={() => onSelectFreeSlot(slot.start_date_utc, slot.end_date_utc)}
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          backgroundColor: "background.paper",

          border: "1px dashed",
          borderColor: "divider",

          transition: "all 0.15s ease-in-out",

          // Starea de Hover controlată direct de buton
          "&:hover": {
            borderWidth: 1.5,
            borderStyle: "dashed", // Forțăm să rămână dashed și la hover dacă așa dorești, sau "solid" pentru evidențiere
            borderColor: "primary.main",
            backgroundColor: (theme) => {
              const primaryColor = theme.palette.action.hover;
              const isLight = theme.palette.mode === "light";
              return isLight
                ? `color-mix(in srgb, ${primaryColor} 12%, #ffffff)`
                : `color-mix(in srgb, ${primaryColor} 5%, #1e1e1e)`;
            },

            // Aprinde textul din interior la hover
            "& .hover-content": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
        })}
      >
        <Stack
          className="hover-content"
          spacing={0.5}
          alignItems="center"
          sx={{
            opacity: 0, // Ascuns implicit
            transform: "translateY(6px)", // Efect de alunecare
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
            {eventStart.format("HH:mm")} - {eventEnd.format("HH:mm")}
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
      </ButtonBase>
    </Box>
  );
}
