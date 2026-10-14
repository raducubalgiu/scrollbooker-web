import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { SelectedBookingItem } from "../../BookingModule";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { useBookingCartTotals } from "../../components/cart/useBookingCartTotals";

type ConfirmServicesSummaryProps = {
  selectedItems: SelectedBookingItem[];
  selectedEmployeeId: number | null;
};

// Pe desktop sumarul serviciilor e deja vizibil permanent în BookingCart
// (sidebar) — secțiunea asta e echivalentul de pe mobil (unde sidebar-ul e
// ascuns), mirror 1:1 după ConfirmServicesView/ConfirmServiceRowView din
// iOS: fiecare serviciu cu nume/durată/preț, separate de dividere, apoi un
// rând de total.
const ConfirmServicesSummary = ({
  selectedItems,
  selectedEmployeeId,
}: ConfirmServicesSummaryProps) => {
  const { displayPrice, showFromLabel } = useBookingCartTotals(
    selectedItems,
    selectedEmployeeId
  );

  if (selectedItems.length === 0) return null;

  return (
    <Box sx={{ display: { xs: "block", md: "none" } }}>
      <Typography
        variant="body2"
        fontWeight={700}
        color="text.secondary"
        sx={{ textTransform: "uppercase" }}
        mb={1.5}
      >
        Servicii selectate
      </Typography>

      <Box sx={styles.container}>
        {selectedItems.map((item, index) => {
          const offering =
            item.offerings.find((o) => o.user.id === selectedEmployeeId) ??
            item.offerings[0];

          return (
            <Box key={item.productId}>
              <Stack spacing={0.5} sx={{ p: 2 }}>
                <Typography fontWeight={700}>{item.productName}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {ProductUtils.getDurationText(item.variantDuration)}
                </Typography>

                {offering && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                    mt={0.5}
                  >
                    <Typography fontWeight={600}>
                      {formatPrice(offering.price_with_discount)} RON
                    </Typography>

                    {offering.discount > 0 && (
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {formatPrice(offering.price)} RON
                        </Typography>
                        <Typography
                          variant="body2"
                          color="error.main"
                          fontWeight={600}
                        >
                          (-{offering.discount}%)
                        </Typography>
                      </>
                    )}
                  </Stack>
                )}
              </Stack>

              {index < selectedItems.length - 1 && <Divider />}
            </Box>
          );
        })}

        <Divider />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography fontWeight={700}>Total</Typography>
          <Typography fontWeight={700}>
            {showFromLabel && (
              <Box
                component="span"
                sx={{ fontSize: "0.75em", color: "text.secondary", mr: 0.5 }}
              >
                DE LA
              </Box>
            )}
            {formatPrice(displayPrice)} RON
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ConfirmServicesSummary;

const styles = {
  container: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    overflow: "hidden",
  },
};
