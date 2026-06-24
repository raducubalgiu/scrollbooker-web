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
import { sumBy } from "lodash";
import ConfirmStep from "./steps/Confirm/ConfirmStep";
import BookingCart from "./components/cart/BookingCart";
import ProductDetailModal from "@/components/cutomized/ProductCard/ProductDetailModal/ProductDetailModal";
import { useBookingState } from "./useBookingState";
import { BookingFlow } from "@/ts/models/booking/booking/BookingFlow";

type BookingModuleProps = {
  bookingFlow: BookingFlow;
  businessId: number;
  businessOwnerId: number;
  userId: number;
  selectedProductId: number | null;
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
    bookingFlow,
    businessId,
    businessOwnerId,
    userId,
    selectedProductId,
  } = props;
  const router = useRouter();
  const employeeId = businessOwnerId !== userId ? userId : null;

  const {
    currentStep,
    selectedItems,
    selectedEmployeeId,
    selectedTimeSlot,
    selectedProduct,
    employeeData,
    isNextDisabled,
    isPending,
    setSelectedEmployeeId,
    setSelectedTimeSlot,
    setSelectedProduct,
    handleSelectItem,
    handleDataLoaded,
    handleNext,
    handleBack,
  } = useBookingState({ bookingFlow, employeeId, selectedProductId });

  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return (
          <ProductsStep
            products={bookingFlow.products}
            businessId={businessId}
            employeeId={employeeId}
            selectedProductId={selectedProductId}
            selectedItems={selectedItems}
            scrollOffset={SCROLL_OFFSET}
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
            employees={bookingFlow.employees}
            selectedEmployeeId={selectedEmployeeId}
            onChangeSelectedEmployeeId={(e) =>
              setSelectedEmployeeId(Number(e.target.value))
            }
          />
        );
      case BookingStepEnum.DATE_AND_HOUR:
        return (
          <AvailabilityStep
            businessId={businessId}
            selectedEmployeeId={selectedEmployeeId}
            slotDuration={sumBy(selectedItems, "variantDuration")}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={setSelectedTimeSlot}
          />
        );
      case BookingStepEnum.CONFIRM:
        return (
          <ConfirmStep
            selectedTimeSlot={selectedTimeSlot}
            address={bookingFlow.business.formatted_address}
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
    <Box sx={{ minHeight: "100vh", bgcolor: "background.paper" }}>
      <BookingAppBar onBack={() => router.back()} />
      <Container maxWidth="xl">
        <BookingBreadcrumbs
          currentStep={currentStep}
          hasEmployees={bookingFlow.business.has_employees}
          employeeId={employeeId}
        />

        <Box sx={styles.container}>
          <Box>{renderStepContent()}</Box>

          <BookingCart
            owner={bookingFlow.business.owner}
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
