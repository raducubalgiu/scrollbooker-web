"use client";

import React from "react";
import { Box, Paper, Stack, Avatar, Typography, alpha } from "@mui/material";
import dayjs from "dayjs";

interface CalendarEventProps {
  slot: any;
  dayColumnIndex: number;
  rowMap: Record<string, number>;
  minTimeStr: string; // Ora minimă globală extrasă din Schedule (ex: "09:00:00")
  slotDuration: number; // Durata selectată pe FE din dropdown în minute (ex: 60)
}

export default function CalendarEvent({
  slot,
  dayColumnIndex,
  minTimeStr,
  slotDuration,
}: CalendarEventProps) {
  // Extragem doar componenta orară curată "HH:mm:ss"
  const startOnlyStr = slot.start_date_locale.includes("T")
    ? slot.start_date_locale.split("T")[1]
    : slot.start_date_locale;
  const endOnlyStr = slot.end_date_locale.includes("T")
    ? slot.end_date_locale.split("T")[1]
    : slot.end_date_locale;

  const globalStart = dayjs(`2026-01-01T${minTimeStr}`);
  const eventStart = dayjs(`2026-01-01T${startOnlyStr}`);
  const eventEnd = dayjs(`2026-01-01T${endOnlyStr}`);

  if (!eventStart.isValid() || !eventEnd.isValid() || !globalStart.isValid())
    return null;

  // 1. CALCULĂM EXTREMITĂȚILE ÎN INDICI DE GRID (SUPORTĂ FRACȚIUNI NATIV)
  const diffStartMinutes = eventStart.diff(globalStart, "minute");
  const startRowIndex = 2 + diffStartMinutes / slotDuration;

  const diffEndMinutes = eventEnd.diff(globalStart, "minute");
  const endRowIndex = 2 + diffEndMinutes / slotDuration;

  // Structura de bază care se așează nativ în matricea Grid a părintelui
  const gridPlacementStyles = {
    gridColumn: dayColumnIndex,
    gridRowStart: startRowIndex,
    gridRowEnd: endRowIndex,
    padding: "2px",
    boxSizing: "border-box",
    zIndex: 4, // Deasupra stratului de fundal alb/hașurat
    height: "100%",
    width: "100%",
  };

  if (slot.is_blocked) {
    return (
      <Box sx={gridPlacementStyles}>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            color: theme.palette.error.dark,
            p: 1,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            borderLeft: "4px solid",
            borderColor: "error.main",
            boxSizing: "border-box",
          })}
        >
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "11px",
            }}
          >
            {slot.info?.message || "Blocat"}
          </Typography>
        </Box>
      </Box>
    );
  }

  if (slot.is_booked) {
    return (
      <Box sx={gridPlacementStyles}>
        <Paper
          elevation={2}
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            backgroundColor: alpha(theme.palette.primary.main, 0.15),
            color: theme.palette.text.primary,
            p: 1,
            borderRadius: 1,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxSizing: "border-box",
            borderLeft: 4,
            borderColor: "primary.main",
          })}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={slot.info?.customer?.avatar || undefined}
              alt={slot.info?.customer?.fullname}
              sx={{
                width: 24,
                height: 24,
                border: "1px solid",
                borderColor: "divider",
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
                  fontSize: "11px",
                  lineHeight: 1.1,
                }}
              >
                {slot.info?.customer?.fullname}
              </Typography>
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", opacity: 0.8, display: "block" }}
              >
                {slot.info?.total_price_with_discount}{" "}
                {slot.info?.payment_currency?.name}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return null;
}
