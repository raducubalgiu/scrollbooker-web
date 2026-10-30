import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { formatPrice } from "@/utils/formatPrice";
import { Box, SxProps, Typography, Theme } from "@mui/material";
import React, { memo } from "react";
import { DesktopSlotTimeRange } from "./DesktopSlotTimeRange";
import { alpha } from "@mui/system";

type DesktopBookedSlotProps = {
  slot: CalendarEventsSlot;
  businessShortDomain: string;
  globalSx: SxProps<Theme>;
  heightPx: number;
  onClick?: (() => void) | undefined;
};

const MIN_HEIGHT_FOR_NAME_ROW = 44;
const MIN_HEIGHT_FOR_DETAILS = 62;

const DesktopBookedSlot = ({
  slot,
  businessShortDomain,
  globalSx,
  heightPx,
  onClick,
}: DesktopBookedSlotProps) => {
  const customerName = slot.info?.customer?.fullname || "Client propriu";
  const isCompact = heightPx < MIN_HEIGHT_FOR_NAME_ROW;
  const showDetails = heightPx >= MIN_HEIGHT_FOR_DETAILS;

  return (
    <Box
      sx={[
        ...(Array.isArray(globalSx) ? globalSx : [globalSx]),
        styles.container(slot, businessShortDomain),
        isCompact && styles.compactContainer,
        !!onClick && styles.clickable,
      ]}
      onClick={onClick}
    >
      {isCompact ? (
        <Box sx={styles.compactRow}>
          <DesktopSlotTimeRange
            startLocale={slot.start_date_locale}
            endLocale={slot.end_date_locale}
            sx={{ flexShrink: 0 }}
          />
          <Typography variant="caption" sx={styles.compactName}>
            · {customerName}
          </Typography>
        </Box>
      ) : (
        <>
          <DesktopSlotTimeRange
            startLocale={slot.start_date_locale}
            endLocale={slot.end_date_locale}
          />
          <Typography variant="caption" sx={styles.customerName}>
            {customerName}
          </Typography>
        </>
      )}

      {showDetails && (
        <Box sx={styles.priceLabelRow}>
          <Typography
            variant="caption"
            component="span"
            sx={styles.serviceName}
          >
            {slot.info?.products.map((p) => p.product_name).join(" • ")}
          </Typography>

          <Typography
            variant="caption"
            component="span"
            sx={styles.dotSeparator}
          >
            •
          </Typography>

          <Typography variant="caption" component="span" sx={styles.priceValue}>
            {formatPrice(slot.info?.total_price_with_discount)}{" "}
            {slot.info?.payment_currency?.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default memo(DesktopBookedSlot);

const styles = {
  container:
    (slot: CalendarEventsSlot, businessShortDomain: string) =>
    (theme: Theme) => {
      const isLight = theme.palette.mode === "light";
      const channel = slot.info?.channel;
      const domain = businessShortDomain?.toLowerCase();

      let baseBrandColor = theme.palette.primary.main;

      if (slot.calendar_color) {
        baseBrandColor = theme.palette.calendar[slot.calendar_color];
      } else if (
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
        backgroundColor: isLight
          ? `color-mix(in srgb, ${baseBrandColor} 22%, #ffffff)`
          : `color-mix(in srgb, ${baseBrandColor} 18%, #1c1c1e)`,
        color: theme.palette.text.primary,
        p: 1,
        borderRadius: 1,
        borderLeft: 3,
        borderColor: alpha(baseBrandColor, 0.6),
        display: "flex",
        flexDirection: "column",
      };
    },
  clickable: {
    cursor: "pointer",
    transition: "filter 0.15s ease",
    "&:hover": { filter: "brightness(0.97)" },
  },
  compactContainer: {
    py: 0.25,
    justifyContent: "center",
  },
  compactRow: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    minWidth: 0,
    lineHeight: 1.1,
  },
  compactName: {
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    minWidth: 0,
  },
  customerName: {
    fontWeight: 600,
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
  },

  priceLabelRow: {
    display: "flex",
    alignItems: "center",
    mt: 0.5,
    width: "100%",
    overflow: "hidden",
  },

  serviceName: {
    fontSize: 11,
    opacity: 0.8,
    fontWeight: 600,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flexShrink: 1,
  },

  dotSeparator: {
    fontSize: 11,
    opacity: 0.8,
    px: 0.5,
    flexShrink: 0,
  },

  priceValue: {
    fontSize: 11,
    opacity: 0.8,
    fontWeight: 700,
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
};
