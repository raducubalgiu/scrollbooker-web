"use client";

import { Box, Button, Slide, Theme } from "@mui/material";
import React from "react";
import { BookingStepEnum, SelectedBookingItem } from "../BookingModule";
import { EmployeeDataType } from "./cart/BookingCart";
import BookingCartTotals from "./cart/BookingCartTotals";
import { useBookingCartTotals } from "./cart/useBookingCartTotals";
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

  const totals = useBookingCartTotals(selectedItems, selectedEmployeeId);

  const isVisible = !isFirstStep || selectedItems.length > 0;

  return (
    <Slide in={isVisible} direction="up" mountOnEnter unmountOnExit>
      <Box sx={styles.container}>
        <BookingCartTotals
          selectedItems={selectedItems}
          displayPrice={totals.displayPrice}
          showFromLabel={totals.showFromLabel}
          totalDuration={totals.totalDuration}
        />

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            onClick={onNext}
            loading={isLoadingNext}
            disabled={isNextDisabled || isLoadingNext}
            sx={{ flex: 2 }}
          >
            {isLastStep ? "Finalizează" : "Continuă"}
          </Button>
        </Protected>
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
};
