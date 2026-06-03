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
      <Stack direction="row" gap={1} alignItems="center" mt={0.5}>
        <Box sx={{ overflow: "hidden" }}>
          <Typography variant="caption" sx={styles.customerName}>
            {slot.info?.customer?.fullname || "Client propriu"}
          </Typography>
          <Typography variant="caption" sx={styles.priceLabel}>
            {formatPrice(slot.info?.total_price_with_discount)}{" "}
            {slot.info?.payment_currency?.name}
          </Typography>
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
    fontWeight: "bold",
    display: "block",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.1,
  },
  priceLabel: {
    fontSize: "10px",
    opacity: 0.8,
    display: "block",
    mt: 0.25,
    fontWeight: 700,
  },
};
