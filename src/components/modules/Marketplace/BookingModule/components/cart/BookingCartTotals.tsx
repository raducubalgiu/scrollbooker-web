import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { Box, Stack, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import React from "react";
import { SelectedBookingItem } from "../../BookingModule";

type BookingCartTotalsProps = {
  selectedItems: SelectedBookingItem[];
  displayPrice: number;
  showFromLabel: false;
  totalDuration: number;
};

const BookingCartTotals = ({
  selectedItems,
  displayPrice,
  showFromLabel,
  totalDuration,
}: BookingCartTotalsProps) => {
  return (
    <>
      {!isEmpty(selectedItems) && (
        <Stack mb={3} spacing={0.5}>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight={600} color="text.secondary">
              Total ({selectedItems.length}{" "}
              {selectedItems.length === 1 ? "serviciu" : "servicii"})
            </Typography>

            <Typography variant="h4" fontWeight={900}>
              {showFromLabel && (
                <Box
                  component="span"
                  sx={{
                    fontSize: "0.6em",
                    fontWeight: 700,
                    mr: 0.5,
                    color: "text.secondary",
                    verticalAlign: "middle",
                  }}
                >
                  DE LA
                </Box>
              )}
              {formatPrice(displayPrice)} RON
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="right"
            fontWeight={500}
          >
            Durată totală: {ProductUtils.getDurationText(totalDuration)}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default BookingCartTotals;
