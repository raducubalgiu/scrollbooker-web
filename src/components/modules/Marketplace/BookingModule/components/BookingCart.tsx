import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import { BookingStepEnum, SelectedBookingItem } from "../BookingModule";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { isEmpty, maxBy, minBy } from "lodash";
import { useMemo } from "react";
import { formatPrice } from "@/utils/formatPrice";

type BookingCartProps = {
  selectedItems: SelectedBookingItem[];
  selectedEmployeeId: number | null;
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
  onBack: () => void;
};

const BookingCart = ({
  selectedItems,
  selectedEmployeeId,
  isNextDisabled,
  isLoadingNext,
  currentStep,
  onBack,
  onNext,
}: BookingCartProps) => {
  const isFirstStep = currentStep === BookingStepEnum.SERVICES;
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;

  const totals = useMemo(() => {
    let minTotal = 0;
    let fixedTotal = 0;
    let hasGlobalVariance = false;
    let totalDuration = 0;

    selectedItems.forEach((item) => {
      const offerings = item.offerings || [];
      const prices = offerings.map((o) => Number(o.price_with_discount));

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (offerings.length > 1 && minPrice !== maxPrice) {
        hasGlobalVariance = true;
      }

      const currentOffering = offerings.find(
        (o) => o.user_id === selectedEmployeeId
      );

      minTotal += minPrice;
      fixedTotal += currentOffering
        ? Number(currentOffering.price_with_discount)
        : minPrice;
      totalDuration += item.variantDuration;
    });

    return {
      displayPrice: selectedEmployeeId ? fixedTotal : minTotal,
      showFromLabel: !selectedEmployeeId && hasGlobalVariance,
      totalDuration,
    };
  }, [selectedItems, selectedEmployeeId]);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        position: "sticky",
        top: 130,
        height: "calc(100vh - 170px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },

        bgcolor: "background.paper",
        borderRadius: 8,
        border: 1.5,
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        p: 6,

        flexDirection: "column",
      }}
    >
      <Typography variant="h4" fontWeight={900} mb={4} letterSpacing="-0.02em">
        Coșul tău
      </Typography>

      <Box sx={{ flex: 1 }}>
        {selectedItems.map((item) => {
          const offerings = item.offerings || [];

          const currentOffering = offerings.find(
            (o) => o.user_id === selectedEmployeeId
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

          const isPriceFixed = !!currentOffering;
          const displayPrice = isPriceFixed
            ? currentOffering.price_with_discount
            : minPrice;
          const showFromLabel =
            !isPriceFixed && offerings.length > 1 && hasDifferentPrices;

          return (
            <Stack
              key={item.productId}
              flexDirection="row"
              alignItems="flex-start"
              justifyContent="space-between"
              mb={3}
            >
              <Stack spacing={0.5} sx={{ minWidth: 0, pr: 2 }}>
                <Typography variant="h5" fontWeight={600} noWrap>
                  {item.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ProductUtils.getDurationText(item.variantDuration)}
                </Typography>
              </Stack>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ whiteSpace: "nowrap" }}
              >
                {showFromLabel && (
                  <Box
                    component="span"
                    sx={{ fontSize: "0.8em", fontWeight: 500, mr: 0.5 }}
                  >
                    de la
                  </Box>
                )}
                {formatPrice(displayPrice)} RON
              </Typography>
            </Stack>
          );
        })}
      </Box>

      <Box
        sx={{
          pt: 3,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        {!isEmpty(selectedItems) && (
          <Stack mb={4} spacing={1}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" fontWeight={500} color="text.secondary">
                Total ({selectedItems.length}{" "}
                {selectedItems.length === 1 ? "serviciu" : "servicii"})
              </Typography>

              <Typography variant="h4" fontWeight={900}>
                {totals.showFromLabel && (
                  <Box
                    component="span"
                    sx={{
                      fontSize: "0.7em",
                      fontWeight: 600,
                      mr: 0.5,
                      color: "text.secondary",
                    }}
                  >
                    de la
                  </Box>
                )}
                {formatPrice(totals.displayPrice)} RON
              </Typography>
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
              fontWeight={500}
            >
              Durată totală:{" "}
              {ProductUtils.getDurationText(totals.totalDuration)}
            </Typography>
          </Stack>
        )}

        <Stack flexDirection="row" alignItems="center" gap={1}>
          {!isFirstStep && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
              fullWidth
              sx={{
                p: 1.75,
                fontSize: 18,
                fontWeight: 700,
                textTransform: "none",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Înapoi
            </Button>
          )}

          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            sx={{
              p: 1.75,
              fontSize: 18,
              fontWeight: 700,
              textTransform: "none",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={onNext}
            loading={isLoadingNext}
            disabled={isNextDisabled || isLoadingNext}
          >
            {isLastStep ? "Finalizează" : "Continuă"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingCart;
