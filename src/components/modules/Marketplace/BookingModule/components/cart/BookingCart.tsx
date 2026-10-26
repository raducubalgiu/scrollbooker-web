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
import { ContactInfo } from "@/ts/models/user/ContactInfo";
import BookingContactButtons from "../BookingContactButtons";
import { EngagementSourceEnum } from "@/ts/enums/EngagementSourceEnum";

export type EmployeeDataType = {
  selectedEmployeeId: number | null;
  avatar: string | null;
  fullname: string | null;
};

type BookingCartProps = {
  business: BookingFlowBusiness;
  businessId: number;
  selectedItems: SelectedBookingItem[];
  employeeData: EmployeeDataType;
  currentStep: BookingStepEnum;
  instantBooking: boolean;
  contact: ContactInfo;
  isNextDisabled: boolean;
  isLoadingNext: boolean;
  onNext: () => void;
};

const BookingCart = ({
  business,
  businessId,
  selectedItems,
  employeeData,
  isNextDisabled,
  isLoadingNext,
  currentStep,
  instantBooking,
  contact,
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
        instantBooking={instantBooking}
      />

      <Box sx={styles.footer}>
        {instantBooking ? (
          <>
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
          </>
        ) : (
          <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
            <BookingContactButtons
              contact={contact}
              userId={business.owner.id}
              businessId={businessId}
              source={EngagementSourceEnum.OTHER}
            />
          </Protected>
        )}
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
