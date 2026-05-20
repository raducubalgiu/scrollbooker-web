"use client";

import { Box, Container } from "@mui/material";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "./components/BookingAppBar";
import ProductsStep from "./steps/Products/ProductsStep";
import AvailabilityStep from "./steps/Availability/AvailabilityStep";
import BookingBreadcrumbs from "./components/BookingBreadcrumbs";
import Specialists from "./steps/Specialists/Specialists";
import { ProductOffering } from "@/ts/models/booking/product/Product";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { sumBy } from "lodash";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import ConfirmStep from "./steps/Confirm/ConfirmStep";
import BookingCart from "./components/cart/BookingCart";
import ProductDetailModal from "@/components/cutomized/ProductCard/ProductDetailModal/ProductDetailModal";
import { useBookingState } from "./useBookingState";

type BookingModuleProps = {
  businessId: number;
  businessOwnerId: number;
  employeeId: number | null;
  selectedServiceId: number | null;
  businessEmployees: BusinessEmployee[];
  businessSummary: BusinessBookingSummary;
};

const SCROLL_OFFSET = 180;
const SIDEBAR_WIDTH = 600;

export enum BookingStepEnum {
  SERVICES = 0,
  SPECIALISTS = 1,
  DATE_AND_HOUR = 2,
  CONFIRM = 3,
}

export interface SelectedBookingItem {
  productId: number;
  variantId: number;
  variantDuration: number;
  offerings: ProductOffering[];
  productName: string;
  variantName: string;
}

const BookingModule = (props: BookingModuleProps) => {
  const {
    businessId,
    employeeId,
    selectedServiceId,
    businessEmployees,
    businessSummary,
  } = props;
  const router = useRouter();

  const {
    currentStep,
    selectedItems,
    targetUserId,
    selectedTimeSlot,
    selectedProduct,
    employeeData,
    isNextDisabled,
    isPending,
    setTargetUserId,
    setSelectedTimeSlot,
    setSelectedProduct,
    handleSelectItem,
    handleDataLoaded,
    handleNext,
    handleBack,
  } = useBookingState(props);

  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return (
          <ProductsStep
            businessId={businessId}
            employeeId={employeeId}
            selectedItems={selectedItems}
            scrollOffset={SCROLL_OFFSET}
            selectedServiceId={selectedServiceId}
            onAdd={handleSelectItem}
            onOpenDetail={(product) =>
              setSelectedProduct({ product, open: true })
            }
            onDataLoaded={handleDataLoaded}
          />
        );
      case BookingStepEnum.SPECIALISTS:
        return (
          <Specialists
            selectedItems={selectedItems}
            employees={businessEmployees}
            selectedEmployeeId={targetUserId}
            onChangeSelectedEmployeeId={(e) =>
              setTargetUserId(Number(e.target.value))
            }
          />
        );
      case BookingStepEnum.DATE_AND_HOUR:
        return (
          <AvailabilityStep
            userId={targetUserId}
            slotDuration={sumBy(selectedItems, "variantDuration")}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={setSelectedTimeSlot}
          />
        );
      case BookingStepEnum.CONFIRM:
        return (
          <ConfirmStep
            selectedTimeSlot={selectedTimeSlot}
            address={businessSummary.formatted_address}
          />
        );
      default:
        return null;
    }
  };

  const handleCloseDetailModal = useCallback(() => {
    setSelectedProduct({ product: null, open: false });
  }, []);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <BookingAppBar onBack={() => router.back()} />
      <Container maxWidth="xl">
        <BookingBreadcrumbs
          currentStep={currentStep}
          hasEmployees={businessSummary.has_employees}
          employeeId={employeeId}
        />

        <Box sx={styles.container}>
          <Box>{renderStepContent()}</Box>

          <BookingCart
            businessSummary={businessSummary}
            selectedItems={selectedItems}
            employeeData={employeeData}
            currentStep={currentStep}
            isNextDisabled={isNextDisabled}
            isLoadingNext={isPending}
            onNext={handleNext}
            onBack={handleBack}
          />
        </Box>
      </Container>

      {selectedProduct.open && (
        <ProductDetailModal
          open={selectedProduct.open}
          product={selectedProduct.product}
          onClose={handleCloseDetailModal}
          onAdd={handleSelectItem}
        />
      )}
    </Box>
  );
};

export default BookingModule;

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
    gap: 8,
    alignItems: "start",
  },
};
