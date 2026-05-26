import { alpha, Box, Theme } from "@mui/material";
import { useMemo } from "react";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import { BookingStepEnum, SelectedBookingItem } from "../../BookingModule";
import BookingCartHeader from "./BookingCartHeader";
import BookingCartActions from "./BookingCartActions";
import BookingCartTotals from "./BookingCartTotals";
import BookingCartContent from "./BookingCartContent";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

export type EmployeeDataType = {
  selectedEmployeeId: number | null;
  avatar: string | null;
  fullname: string | null;
};

type BookingCartProps = {
  businessSummary: BusinessBookingSummary;
  selectedItems: SelectedBookingItem[];
  employeeData: EmployeeDataType;
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
  onBack: () => void;
};

const BookingCart = ({
  businessSummary,
  selectedItems,
  employeeData,
  isNextDisabled,
  isLoadingNext,
  currentStep,
  onBack,
  onNext,
}: BookingCartProps) => {
  const isFirstStep = currentStep === BookingStepEnum.SERVICES;
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;
  const { selectedEmployeeId } = employeeData;

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
    <Box sx={styles.container}>
      <BookingCartHeader
        businessOwner={businessSummary.owner}
        employeeData={employeeData}
      />

      <BookingCartContent
        selectedItems={selectedItems}
        selectedEmployeeId={selectedEmployeeId}
      />

      <Box sx={styles.footer}>
        <BookingCartTotals
          selectedItems={selectedItems}
          displayPrice={totals.displayPrice}
          showFromLabel={totals.showFromLabel}
          totalDuration={totals.totalDuration}
        />

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          <BookingCartActions
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isLoadingNext={isLoadingNext}
            isNextDisabled={isNextDisabled}
            onBack={onBack}
            onNext={onNext}
          />
        </Protected>
      </Box>
    </Box>
  );
};

export default BookingCart;

const styles = {
  container: {
    display: { xs: "none", md: "flex" },
    position: "sticky",
    top: 130,
    height: "calc(100vh - 170px)",
    bgcolor: "background.paper",
    borderRadius: 8,
    border: 1.5,
    borderColor: (theme: Theme) => alpha(theme.palette.divider, 0.1),
    flexDirection: "column",
    overflow: "hidden",
  },
  footer: {
    p: 4,
    pt: 3,
    borderTop: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
  },
};
