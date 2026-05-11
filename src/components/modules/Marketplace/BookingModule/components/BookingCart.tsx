import {
  alpha,
  Avatar,
  Box,
  Button,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { BookingStepEnum, SelectedBookingItem } from "../BookingModule";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { isEmpty, maxBy, minBy } from "lodash";
import { useMemo } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import { formatRating } from "@/utils/formatters";

type BookingCartProps = {
  businessSummary: BusinessBookingSummary;
  selectedItems: SelectedBookingItem[];
  selectedEmployeeId: number | null;
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
  onBack: () => void;
};

const BookingCart = ({
  businessSummary,
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

    selectedItems?.forEach((item) => {
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
        bgcolor: "background.paper",
        borderRadius: 8,
        border: 1.5,
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        p={5}
        pb={3}
        sx={{ borderBottom: "1px solid", borderColor: "divider" }}
      >
        <Stack flexDirection="row" gap={2}>
          <Avatar
            src={businessSummary.owner.avatar ?? ""}
            variant="rounded"
            sx={{
              width: 80,
              height: 80,
              border: 1,
              borderColor: "divider",
              borderRadius: 4,
            }}
          />
          <Stack justifyContent="center" sx={{ minWidth: 0 }}>
            <Typography fontSize={23} fontWeight={700} noWrap>
              {businessSummary.owner.fullname}
            </Typography>

            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography fontSize={20} fontWeight={700}>
                {formatRating(businessSummary.owner.ratings_average)}
              </Typography>
              <Rating
                readOnly
                value={businessSummary.owner.ratings_average}
                precision={0.5}
              />
              <Typography fontSize={18} color="text.secondary">
                (100)
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack flexDirection="row" alignItems="center" gap={1} mt={2.5}>
          <Avatar
            src={
              // businessEmployees?.find((e) => e.id === selectedEmployeeId)
              //   ?.avatar ?? ""
              "https://media.scrollbooker.ro/avatar-male-17.jpg"
            }
            sx={{ width: 30, height: 30, border: 1, borderColor: "divider" }}
          />
          <Typography
            fontSize={15}
            //color="text.secondary"
            fontWeight={500}
            noWrap
          >
            Specialist:{" "}
            <strong>
              {/* {
                businessEmployees?.find((e) => e.id === selectedEmployeeId)
                  ?.fullname
              } */}
              Radu Ion
            </strong>
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
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
            backgroundColor: (theme) => alpha(theme.palette.divider, 0.2),
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: (theme) => alpha(theme.palette.divider, 0.4),
            },
          },
          // Pentru Firefox
          scrollbarWidth: "thin",
          scrollbarColor: (theme) =>
            `${alpha(theme.palette.divider, 0.2)} transparent`,
        }}
      >
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

      <Box
        sx={{
          p: 4,
          pt: 3,
          borderTop: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
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
                {totals.showFromLabel && (
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

        <Stack flexDirection="row" alignItems="center" gap={1.5}>
          {!isFirstStep && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBack}
              sx={{
                flex: 1,
                p: 1.75,
                fontSize: 16,
                fontWeight: 700,
                textTransform: "none",
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
            onClick={onNext}
            loading={isLoadingNext}
            disabled={isNextDisabled || isLoadingNext}
            sx={{
              flex: 2,
              p: 1.75,
              fontSize: 18,
              fontWeight: 700,
              textTransform: "none",
            }}
          >
            {isLastStep ? "Finalizează" : "Continuă"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingCart;
