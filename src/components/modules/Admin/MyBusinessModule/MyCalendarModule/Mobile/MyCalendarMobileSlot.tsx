"use client";

import React, { memo } from "react";
import { Box, ButtonBase, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckIcon from "@mui/icons-material/Check";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { MyCalendarMobileSlotStyle } from "./myCalendarMobileSlotStyle";

type MyCalendarMobileSlotProps = {
  slot: CalendarEventsSlot;
  style: MyCalendarMobileSlotStyle;
  height: number;
  offsetY: number;
  isBlocking: boolean;
  showCheckbox: boolean;
  isChecked: boolean;
  isCheckboxEnabled: boolean;
  onTap: (slot: CalendarEventsSlot) => void;
};

const MyCalendarMobileSlot = ({
  slot,
  style,
  height,
  offsetY,
  isBlocking,
  showCheckbox,
  isChecked,
  isCheckboxEnabled,
  onTap,
}: MyCalendarMobileSlotProps) => {
  const isFreeSlot = !slot.is_booked && !slot.is_blocked;
  const isCompact = height < 40;
  const isVeryCompact = height < 28;
  const isExternalBlock = slot.is_blocked && !!slot.info?.is_external;

  const showsAddIcon =
    !slot.is_blocked &&
    !isChecked &&
    !(isBlocking && isFreeSlot) &&
    !slot.is_booked &&
    !slot.is_last_minute &&
    !style.isBefore;

  const showsLeadingBar = slot.is_booked || slot.is_blocked || slot.is_last_minute;

  const textSx = isVeryCompact ? styles.compactText : undefined;
  const timeRange = `${slot.start_date_locale.slice(11, 16)} – ${slot.end_date_locale.slice(11, 16)}`;

  const renderContent = () => {
    if (slot.is_blocked) {
      return (
        <Typography
          variant="caption"
          fontWeight={700}
          color="text.primary"
          sx={{ ...(isCompact ? styles.clamp1 : styles.clamp2), ...textSx }}
        >
          {slot.info?.blocked_message || "Slot blocat"}
        </Typography>
      );
    }
    if (isChecked) {
      return (
        <Typography
          variant="caption"
          fontWeight={700}
          color="error.main"
          sx={{ ...styles.clamp1, ...textSx }}
        >
          În curs de blocare
        </Typography>
      );
    }
    if (slot.is_booked) {
      const title = slot.info?.customer?.fullname || "Rezervat";
      const servicesNames =
        slot.info?.products.map((p) => p.product_name).join(" • ") ?? "";
      const priceText = slot.info
        ? `${Number(slot.info.total_price_with_discount).toFixed(2)} ${slot.info.payment_currency.name}`
        : null;
      const subtitle = [servicesNames || null, priceText]
        .filter((v): v is string => !!v)
        .join(" • ");

      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.25 }}>
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.primary"
            sx={{ ...(isCompact ? styles.clamp1 : styles.clamp2), ...textSx }}
          >
            <Box component="span" sx={styles.inlineTime}>
              {timeRange}
            </Box>
            {" · "}
            {title}
          </Typography>
          {!isCompact && !!subtitle && (
            <Typography variant="caption" color="text.secondary" sx={styles.clamp2}>
              {subtitle}
            </Typography>
          )}
        </Box>
      );
    }
    if (slot.is_last_minute) {
      return (
        <Typography variant="caption" fontWeight={700} color="rating.main">
          Last Minute • {Math.round(slot.last_minute_discount ?? 0)}%
        </Typography>
      );
    }
    if (style.isBefore) {
      return (
        <Typography variant="caption" fontWeight={700} color="text.disabled">
          Neprogramat
        </Typography>
      );
    }
    if (isFreeSlot) {
      return (
        <Typography
          variant="caption"
          fontWeight={600}
          color="text.secondary"
          sx={{ ...styles.clamp1, ...textSx }}
        >
          {timeRange}
        </Typography>
      );
    }
    return null;
  };

  return (
    <ButtonBase
      onClick={() => onTap(slot)}
      sx={[
        styles.root,
        {
          height,
          top: offsetY,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
          borderWidth: isFreeSlot ? 1 : 2,
        },
      ]}
    >
      <Box
        sx={{
          ...styles.inner,
          ...(isCompact && styles.innerCompact),
          ...(isVeryCompact && styles.innerVeryCompact),
        }}
      >
        {showsLeadingBar && (
          <Box sx={{ ...styles.leadingBar, backgroundColor: style.lineColor }} />
        )}

        <Box sx={styles.contentColumn}>
          {renderContent()}

          {isExternalBlock && !isCompact && (
            <Box sx={styles.footerRow}>
              <Typography variant="caption" color="text.secondary">
                Din Google Calendar
              </Typography>
            </Box>
          )}
        </Box>

        {showCheckbox && (
          <Box
            sx={{
              ...styles.checkbox,
              ...(isCompact && styles.checkboxCentered),
              opacity: isCheckboxEnabled ? 1 : 0.5,
            }}
          >
            <Box
              sx={{
                ...styles.checkboxBox,
                backgroundColor: isChecked ? "error.main" : "transparent",
              }}
            >
              {isChecked && <CheckIcon sx={{ fontSize: 12, color: "common.white" }} />}
            </Box>
          </Box>
        )}

        {showsAddIcon && (
          <AddCircleOutlineIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: Math.min(Math.max(height * 0.6, 14), 28),
              color: "divider",
            }}
          />
        )}
      </Box>
    </ButtonBase>
  );
};

export default memo(MyCalendarMobileSlot);

const styles = {
  root: {
    position: "absolute",
    left: 4,
    right: 4,
    borderRadius: 1,
    border: "2px solid",
    boxSizing: "border-box",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    display: "block",
    textAlign: "left",
    overflow: "hidden",
  },
  inner: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    gap: 0.75,
    p: 1,
    boxSizing: "border-box",
  },
  innerCompact: {
    alignItems: "center",
    py: 0.25,
  },
  innerVeryCompact: {
    py: 0,
    px: 0.75,
  },
  inlineTime: {
    fontSize: "0.85em",
    fontWeight: 500,
    color: "text.secondary",
  },
  compactText: {
    fontSize: "0.6875rem",
    lineHeight: 1.1,
  },
  leadingBar: {
    width: 4,
    borderRadius: 1,
    alignSelf: "stretch",
    flexShrink: 0,
  },
  contentColumn: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: 0,
    gap: 0.25,
  },
  footerRow: {
    mt: "auto",
  },
  clamp1: {
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  clamp2: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  checkbox: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  checkboxCentered: {
    top: "50%",
    transform: "translateY(-50%)",
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 0.5,
    border: "1px solid",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
