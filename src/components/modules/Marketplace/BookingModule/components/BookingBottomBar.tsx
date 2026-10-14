"use client";

import { Box, Button, Slide, Stack, Theme, Typography } from "@mui/material";
import React from "react";
import { BookingStepEnum, SelectedBookingItem } from "../BookingModule";
import { EmployeeDataType } from "./cart/BookingCart";
import { useBookingCartTotals } from "./cart/useBookingCartTotals";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type BookingBottomBarProps = {
  selectedItems: SelectedBookingItem[];
  employeeData: EmployeeDataType;
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
};

// Structura din iOS: un singur row — stânga preț total + durată totală
// (stivuite), dreapta butonul Next. Nu reutilizăm BookingCartTotals (cel
// de pe sidebar-ul desktop), care e gândit pentru o altă formă (etichetă
// "Total (N servicii)" + durată aliniată separat pe toată lățimea) — aici
// e nevoie de blocul compact stânga/dreapta de pe mobil.
const BookingBottomBar = ({
  selectedItems,
  employeeData,
  currentStep,
  isNextDisabled,
  isLoadingNext,
  onNext,
}: BookingBottomBarProps) => {
  const isFirstStep = currentStep === BookingStepEnum.SERVICES;
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;
  const { selectedEmployeeId } = employeeData;

  const { displayPrice, showFromLabel, totalDuration } = useBookingCartTotals(
    selectedItems,
    selectedEmployeeId
  );

  const isVisible = !isFirstStep || selectedItems.length > 0;

  return (
    <Slide in={isVisible} direction="up" mountOnEnter unmountOnExit>
      <Box sx={styles.container}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {selectedItems.length > 0 && (
            <Stack spacing={0.25} sx={{ minWidth: 0 }}>
              <Typography variant="h6" fontWeight={800} noWrap>
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

              <Typography variant="body2" color="text.secondary" noWrap>
                {ProductUtils.getDurationText(totalDuration)}
              </Typography>
            </Stack>
          )}

          <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
            <Button
              variant="contained"
              disableElevation
              onClick={onNext}
              loading={isLoadingNext}
              disabled={isNextDisabled || isLoadingNext}
              sx={styles.nextButton}
            >
              {isLastStep ? "Finalizează" : "Continuă"}
            </Button>
          </Protected>
        </Stack>
      </Box>
    </Slide>
  );
};

export default BookingBottomBar;

const styles = {
  container: {
    display: { xs: "block", md: "none" },
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: (theme: Theme) => theme.zIndex.appBar + 10,
    bgcolor: "background.default",
    borderTop: "1px solid",
    borderColor: "divider",
    px: 2,
    pt: 1.5,
    pb: "calc(12px + env(safe-area-inset-bottom))",
  },
  nextButton: {
    flexShrink: 0,
    borderRadius: 50,
    px: 4,
    py: 1.25,
    fontWeight: 700,
    textTransform: "none",
  },
};
