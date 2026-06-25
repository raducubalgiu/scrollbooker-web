import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { alpha, Box, Stack, Theme, Typography } from "@mui/material";
import { isEmpty, maxBy, minBy } from "lodash";
import React from "react";
import { SelectedBookingItem } from "../../BookingModule";

type BookingCartContentProps = {
  selectedItems: SelectedBookingItem[];
  selectedEmployeeId: number | null;
};

const BookingCartContent = ({
  selectedItems,
  selectedEmployeeId,
}: BookingCartContentProps) => {
  return (
    <Box sx={styles.container}>
      {isEmpty(selectedItems) ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 4 }}
        >
          Coșul tău este gol
        </Typography>
      ) : (
        selectedItems.map((item) => {
          const offerings = item.offerings || [];
          const currentOffering = offerings.find(
            (o) => o.user.id === selectedEmployeeId
          );
          const minPrice = minBy(
            offerings,
            "price_with_discount"
          )?.price_with_discount;
          const maxPrice = maxBy(
            offerings,
            "price_with_discount"
          )?.price_with_discount;
          const hasDifferentPrices = minPrice !== maxPrice;

          const displayPrice = currentOffering
            ? currentOffering.price_with_discount
            : minPrice;
          const showFromLabel =
            !currentOffering && offerings.length > 1 && hasDifferentPrices;

          return (
            <Stack
              key={item.productId}
              flexDirection="row"
              alignItems="flex-start"
              justifyContent="space-between"
              mb={3}
            >
              <Stack spacing={0.5} sx={{ minWidth: 0, pr: 2 }}>
                <Typography fontSize={20} fontWeight={600} noWrap>
                  {item.productName}
                </Typography>
                <Typography color="text.secondary">
                  {ProductUtils.getDurationText(item.variantDuration)}
                </Typography>
              </Stack>

              <Typography
                fontSize={20}
                fontWeight={700}
                sx={{ whiteSpace: "nowrap" }}
              >
                {showFromLabel && (
                  <Box
                    component="span"
                    sx={{ fontSize: "0.75em", fontWeight: 500, mr: 0.5 }}
                  >
                    de la
                  </Box>
                )}
                {formatPrice(displayPrice)} RON
              </Typography>
            </Stack>
          );
        })
      )}
    </Box>
  );
};

export default BookingCartContent;

const styles = {
  container: {
    flex: 1,
    overflowY: "auto",
    p: 4,
    py: 3,
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: (theme: Theme) => alpha(theme.palette.divider, 0.2),
      borderRadius: "10px",
      "&:hover": {
        backgroundColor: (theme: Theme) => alpha(theme.palette.divider, 0.4),
      },
    },
    scrollbarWidth: "thin",
    scrollbarColor: (theme: Theme) =>
      `${alpha(theme.palette.divider, 0.2)} transparent`,
  },
};
