"use client";

import React from "react";
import { Box, Stack, Typography, ButtonBase, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { formatPrice } from "@/utils/formatPrice";
import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";

interface CalendarEventProps {
  businessShortDomain: string;
  slot: CalendarEventsSlot;
  isBlocking: boolean;
  minTimeStr: string | undefined;
  slotDuration: number;
  rowHeight: number;
  isSelected: boolean;
  onSelectFreeSlot: (startDateUtc: string, endDateUtc: string) => void;
  onToggleSelectSlot: (slot: CalendarEventsSlot) => void;
}

export default function CalendarEvent({
  businessShortDomain,
  slot,
  isBlocking,
  minTimeStr,
  slotDuration,
  rowHeight,
  isSelected,
  onSelectFreeSlot,
  onToggleSelectSlot,
}: CalendarEventProps) {
  const startOnlyStr = slot.start_date_locale.split("T")[1];
  const endOnlyStr = slot.end_date_locale.split("T")[1];

  const globalStart = dayjs(`2026-01-01T${minTimeStr}`);
  const eventStart = dayjs(`2026-01-01T${startOnlyStr}`);
  const eventEnd = dayjs(`2026-01-01T${endOnlyStr}`);

  const isPast = dayjs().isAfter(dayjs(slot.start_date_locale));

  if (!eventStart.isValid() || !eventEnd.isValid() || !globalStart.isValid())
    return null;

  const pixelsPerMinute = rowHeight / slotDuration;
  const minutesFromGlobalStart = eventStart.diff(globalStart, "minute");

  const topPositionPixels = minutesFromGlobalStart * pixelsPerMinute;
  const eventDurationMinutes = eventEnd.diff(eventStart, "minute");
  const heightPixels = eventDurationMinutes * pixelsPerMinute;

  const hasSpacing = slot.is_booked || slot.is_blocked || slot.is_last_minute;

  const GAP_PIXELS = 3;

  const absolutePlacementStyles = {
    position: "absolute",

    top: hasSpacing
      ? `${topPositionPixels + GAP_PIXELS}px`
      : `${topPositionPixels}px`,

    height: hasSpacing
      ? `${heightPixels - GAP_PIXELS * 2}px`
      : `${heightPixels}px`,

    left: hasSpacing ? "6px" : 0,
    right: hasSpacing ? "6px" : 0,

    zIndex: 5,
    boxSizing: "border-box",
    overflow: "hidden",

    ...(slot.is_booked && {
      boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.04)",
    }),
  };

  if (slot.is_blocked) {
    return (
      <Box
        sx={(theme) => ({
          ...absolutePlacementStyles,
          backgroundColor:
            theme.palette.mode === "light"
              ? `color-mix(in srgb, ${theme.palette.error.main} 12%, #ffffff)`
              : `color-mix(in srgb, ${theme.palette.error.main} 5%, #1e1e1e)`,
          color: theme.palette.error.dark,
          p: 1,
          borderRadius: 1,
          borderLeft: 3,
          borderColor: "error.main",
          display: "flex",
          flexDirection: "column",
        })}
      >
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {dayjs(slot.start_date_locale).format("HH:mm")} -{" "}
          {dayjs(slot.end_date_locale).format("HH:mm")}
        </Typography>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            fontWeight: 700,
            color: "error.dark",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mt: 0.5,
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
        sx={(theme) => {
          const isLight = theme.palette.mode === "light";
          const channel = slot.info?.channel;
          const domain = businessShortDomain?.toLowerCase();

          let baseBrandColor = theme.palette.primary.main;

          if (
            channel === AppointmentChannelEnum.OWN_CLIENT &&
            domain &&
            domain in theme.palette
          ) {
            const customColorObj = theme.palette[
              domain as keyof typeof theme.palette
            ] as typeof theme.palette.primary;

            if (customColorObj && customColorObj.main) {
              baseBrandColor = customColorObj.main;
            }
          }

          return {
            ...absolutePlacementStyles,
            backgroundColor: isLight
              ? `color-mix(in srgb, ${baseBrandColor} 12%, #ffffff)`
              : `color-mix(in srgb, ${baseBrandColor} 8%, #1c1c1e)`,
            color: theme.palette.text.primary,
            p: 1,
            borderRadius: 1,
            borderLeft: 3,
            borderColor: baseBrandColor,
            display: "flex",
            flexDirection: "column",
          };
        }}
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
              {slot.info?.customer?.fullname || "Client propriu"}
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
              {formatPrice(slot.info?.total_price_with_discount)}{" "}
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
          borderLeft: 3,
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

  if (isPast) {
    return (
      <Box
        sx={(theme) => {
          const strokeColor = theme.palette.text.secondary;
          return {
            ...absolutePlacementStyles, // Folosește coordonatele cu gap pentru a nu se lipi de margini
            borderRadius: 2, // Rotunjim colțurile hașurii conform noului design premium
            backgroundImage: `repeating-linear-gradient(
                  45deg, 
                  transparent, 
                  transparent 5px, 
                  ${strokeColor} 5px, 
                  ${strokeColor} 6px
                )`,
            mixBlendMode:
              theme.palette.mode === "light" ? "multiply" : "screen",
            opacity: 0.15,
          };
        }}
      />
    );
  }

  return (
    <Box sx={absolutePlacementStyles}>
      <ButtonBase
        // Dacă suntem în modul isBlocking, click-ul selectează slotul, altfel deschide programarea normală
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

          // Fundal dinamic
          backgroundColor: isBlocking
            ? isSelected
              ? "rgba(211, 47, 47, 0.04)"
              : "background.paper"
            : "transparent",

          // Chenar dinamic
          border: "1px dashed",
          borderColor: isBlocking && isSelected ? "error.main" : "divider",
          borderStyle: isBlocking && isSelected ? "solid" : "dashed",

          // REZOLVARE EROARE TS: Un singur bloc de hover, controlat dinamic prin starea isBlocking
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

            // Declanșăm animația textului doar dacă NU suntem în modul de blocare
            "& .hover-content": {
              opacity: isBlocking ? 0 : 1,
              transform: isBlocking ? "translateY(6px)" : "translateY(0)",
            },
          },
        })}
      >
        {isBlocking ? (
          // MODUL BLOCARE ACTIVE: Randăm DOAR checkbox-ul mare, centrat, vizibil mereu
          <Checkbox
            checked={isSelected}
            color="error" // Culoarea roșie indică acțiunea administrativă de blocare
            size="medium"
            sx={{
              p: 0,
              "& .MuiSvgIcon-root": { fontSize: 24 },
            }}
            onClick={(e) => e.stopPropagation()}
            onChange={() => onToggleSelectSlot(slot)}
          />
        ) : (
          // MODUL NORMAL ACTIVE: Randăm textul cu efectul vechi de mișcare la hover
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
        )}
      </ButtonBase>
    </Box>
  );
}
