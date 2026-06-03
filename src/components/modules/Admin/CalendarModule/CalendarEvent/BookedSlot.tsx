import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { formatPrice } from "@/utils/formatPrice";
import { Box, Stack, SxProps, Typography, Theme } from "@mui/material";
import React from "react";
import { SlotTimeRange } from "./SlotTimeRange";

type BookedSlotProps = {
  slot: CalendarEventsSlot;
  businessShortDomain: string;
  globalSx: SxProps<Theme>;
};

const BookedSlot = ({
  slot,
  businessShortDomain,
  globalSx,
}: BookedSlotProps) => {
  return (
    <Box
      sx={[
        ...(Array.isArray(globalSx) ? globalSx : [globalSx]),
        styles.container(slot, businessShortDomain),
      ]}
    >
      <SlotTimeRange
        startLocale={slot.start_date_locale}
        endLocale={slot.end_date_locale}
      />
      <Stack direction="row" gap={1} alignItems="center" mt={1}>
        <Box sx={{ overflow: "hidden", width: "100%" }}>
          <Typography variant="caption" sx={styles.customerName}>
            {slot.info?.customer?.fullname || "Client propriu"}
          </Typography>

          <Box sx={styles.priceLabelRow}>
            <Typography
              variant="caption"
              component="span"
              sx={styles.serviceName}
            >
              Tuns Special
            </Typography>

            <Typography
              variant="caption"
              component="span"
              sx={styles.dotSeparator}
            >
              •
            </Typography>

            <Typography
              variant="caption"
              component="span"
              sx={styles.priceValue}
            >
              {formatPrice(slot.info?.total_price_with_discount)}{" "}
              {slot.info?.payment_currency?.name}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default BookedSlot;

const styles = {
  container:
    (slot: CalendarEventsSlot, businessShortDomain: string) =>
    (theme: Theme) => {
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
