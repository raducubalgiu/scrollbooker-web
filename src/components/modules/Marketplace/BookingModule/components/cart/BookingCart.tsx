import { alpha, Box, Theme } from "@mui/material";
import { BookingStepEnum, SelectedBookingItem } from "../../BookingModule";
import BookingCartHeader from "./BookingCartHeader";
import BookingCartActions from "./BookingCartActions";
import BookingCartTotals from "./BookingCartTotals";
import BookingCartContent from "./BookingCartContent";
import { useBookingCartTotals } from "./useBookingCartTotals";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { BookingFlowBusiness } from "@/ts/models/booking/booking/BookingFlow";

export type EmployeeDataType = {
  selectedEmployeeId: number | null;
  avatar: string | null;
  fullname: string | null;
};

type BookingCartProps = {
  business: BookingFlowBusiness;
  selectedItems: SelectedBookingItem[];
  employeeData: EmployeeDataType;
  currentStep: BookingStepEnum;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
};

const BookingCart = ({
  business,
  selectedItems,
  employeeData,
  isNextDisabled,
  isLoadingNext,
  currentStep,
  onNext,
}: BookingCartProps) => {
  const isLastStep = currentStep === BookingStepEnum.CONFIRM;
  const { selectedEmployeeId } = employeeData;

  const totals = useBookingCartTotals(selectedItems, selectedEmployeeId);

  return (
    <Box sx={styles.container}>
      <BookingCartHeader
        businessOwner={business.owner}
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
            isLastStep={isLastStep}
            isLoadingNext={isLoadingNext}
            isNextDisabled={isNextDisabled}
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
  },
};
