import { alpha, Box, Button, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { BookingStepEnum, SelectedBookingItem } from "../BookingModule";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { isEmpty, sumBy } from "lodash";

type BookingCartProps = {
  selectedItems: SelectedBookingItem[];
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  onNext: () => void;
  onBack: () => void;
};

const BookingCart = ({
  selectedItems,
  isNextDisabled,
  currentStep,
  onBack,
  onNext,
}: BookingCartProps) => {
  const isFirstStep = currentStep === BookingStepEnum.SERVICES;
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;

  const totalPrice = useMemo(
    () =>
      sumBy(
        selectedItems,
        (item) => Number(item.offering.price_with_discount) || 0
      ),
    [selectedItems]
  );

  const totalDuration = useMemo(
    () => sumBy(selectedItems, "variantDuration"),
    [selectedItems]
  );

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
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.6, mb: 2.5 }}
        >
          Aici vei vedea serviciile selectate. Spațiul generos ajută la
          claritate.
        </Typography>

        {selectedItems.map((item) => (
          <Stack
            key={item.productId}
            flexDirection="row"
            alignItems="flex-start"
            justifyContent="space-between"
            mb={2}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5">{item.productName}</Typography>
              <Typography color="text.secondary">
                {ProductUtils.getDurationText(item.variantDuration)}
              </Typography>
            </Stack>
            <Typography variant="h5">
              {item.offering.price_with_discount} RON
            </Typography>
          </Stack>
        ))}
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
                Total ({selectedItems.length} servicii)
              </Typography>
              <Typography variant="h4" fontWeight={900}>
                {totalPrice} RON
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="right"
            >
              Durată totală: {ProductUtils.getDurationText(totalDuration)}
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
            disabled={isNextDisabled}
          >
            {isLastStep ? "Finalizează" : "Continuă"}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default BookingCart;
