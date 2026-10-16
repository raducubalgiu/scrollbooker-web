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

const MIN_TOUCH_HEIGHT = 44;

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
  const touchHeight = Math.max(height, MIN_TOUCH_HEIGHT);

  const showsAddIcon =
    !isVeryCompact &&
    !slot.is_blocked &&
    !isChecked &&
    !(isBlocking && isFreeSlot) &&
    !slot.is_booked &&
    !slot.is_last_minute &&
    !style.isBefore;

  const showsLeadingBar = slot.is_booked || slot.is_blocked || slot.is_last_minute;

  const renderContent = () => {
    if (isVeryCompact) return null;

    if (slot.is_blocked) {
      return (
        <Typography variant="caption" fontWeight={700} color="text.primary" sx={styles.clamp2}>
          {slot.info?.blocked_message || "Blocat"}
        </Typography>
      );
    }
    if (isChecked) {
      return (
        <Typography variant="caption" fontWeight={700} color="error.main">
          În curs de blocare
        </Typography>
      );
    }
    if (isBlocking && isFreeSlot) {
      return null;
    }
    if (slot.is_booked) {
      const title = slot.info?.customer?.fullname || "Rezervat";
      const servicesNames =
        slot.info?.products.map((p) => p.product_name).join(" • ") ?? "";
      const priceText = slot.info
        ? `${slot.info.total_price_with_discount.toFixed(2)} ${slot.info.payment_currency.name}`
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
            sx={isCompact ? styles.clamp1 : styles.clamp2}
          >
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
    return null;
  };

  return (
    <ButtonBase
      onClick={() => onTap(slot)}
      sx={[
        styles.root,
        {
          height: touchHeight,
          top: offsetY,
          backgroundColor: style.backgroundColor,
          borderColor: style.borderColor,
        },
      ]}
    >
      <Box sx={{ ...styles.inner, height, minHeight: height }}>
        {showsLeadingBar && (
          <Box sx={{ ...styles.leadingBar, backgroundColor: style.lineColor }} />
        )}

        <Box sx={styles.contentColumn}>
          {renderContent()}

          {slot.is_blocked && !isVeryCompact && (
            <Box sx={styles.footerRow}>
              {isExternalBlock ? (
                <Typography variant="caption" color="text.secondary">
                  Din Google Calendar
                </Typography>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  Slot blocat
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {showCheckbox && (
          <Box sx={{ ...styles.checkbox, opacity: isCheckboxEnabled ? 1 : 0.5 }}>
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
              fontSize: Math.min(Math.max(height * 0.6, 16), 28),
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
    display: "flex",
    alignItems: "flex-start",
    gap: 0.75,
    p: 1,
    boxSizing: "border-box",
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
    top: 0,
    right: 0,
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
