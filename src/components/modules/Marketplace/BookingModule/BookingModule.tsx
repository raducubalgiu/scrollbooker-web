"use client";

import { Box, Container, SelectChangeEvent } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "./components/BookingAppBar";
import ProductsStep from "./steps/Products/ProductsStep";
import AvailabilityStep from "./steps/Availability/AvailabilityStep";
import BookingBreadcrumbs from "./components/BookingBreadcrumbs";
import Specialists from "./steps/Specialists/Specialists";
import { ProductOffering } from "@/ts/models/booking/product/Product";
import BookingCart from "./components/BookingCart";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { sumBy } from "lodash";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import {
  Appointment,
  ScrollBookerAppointmentCreate,
} from "@/ts/models/booking/appointment/Appointment";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import { BusinessBookingSummary } from "@/ts/models/booking/business/Business";
import ConfirmStep from "./steps/ConfirmStep";

type BookingModuleProps = {
  businessId: number;
  businessOwnerId: number;
  employeeId: number | null;
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

const BookingModule = ({
  businessId,
  businessOwnerId,
  employeeId,
  businessEmployees,
  businessSummary,
}: BookingModuleProps) => {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<SelectedBookingItem[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    employeeId
  );
  const [selectedTimeSlot, setSelectedTimeSlot] =
    useState<AvailableTimeSlot | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStepEnum>(
    BookingStepEnum.SERVICES
  );

  const { mutate: handleSaveAppointment, isPending } = useMutate<
    ScrollBookerAppointmentCreate,
    Appointment
  >({
    key: ["create-scrollbooker-appointment"],
    url: "/api/appointments",
    method: "POST",
    options: {
      onSuccess: (appointment: Appointment) => {
        toast.success("Rezervarea ta este confirmată");
        router.push(`/appointments/${appointment.id}`);
      },
    },
  });

  const handleSelectItem = useCallback((item: SelectedBookingItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);

      if (exists) {
        if (!item.variantId || exists.variantId === item.variantId) {
          return prev.filter((i) => i.productId !== item.productId);
        }

        return prev.map((i) => (i.productId === item.productId ? item : i));
      }

      return [...prev, item];
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep === BookingStepEnum.CONFIRM) {
      if (!selectedTimeSlot || !selectedEmployeeId) return;

      const { start_date_utc, end_date_utc } = selectedTimeSlot;

      const body: ScrollBookerAppointmentCreate = {
        start_date: start_date_utc,
        end_date: end_date_utc,
        payment_currency_id: 1,
        product_variants: selectedItems.map((item) => {
          const activeOffering = item.offerings.find(
            (o) => o.user_id === selectedEmployeeId
          );

          return {
            id: item.variantId,
            offering: {
              user_id: activeOffering?.user_id || selectedEmployeeId,
            },
          };
        }),
      };

      handleSaveAppointment(body);
    } else {
      setCurrentStep((prev) => {
        if (prev === BookingStepEnum.SERVICES && employeeId) {
          return BookingStepEnum.DATE_AND_HOUR;
        }
        return prev + 1;
      });
    }
  }, [
    currentStep,
    selectedTimeSlot,
    selectedItems,
    selectedEmployeeId,
    employeeId,
    handleSaveAppointment,
  ]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === BookingStepEnum.DATE_AND_HOUR && employeeId) {
        return BookingStepEnum.SERVICES;
      }
      return prev - 1;
    });
  }, [employeeId]);

  const handleChangeEmployeeId = useCallback(
    (event: SelectChangeEvent<number>) => {
      setSelectedEmployeeId(Number(event.target.value));
    },
    []
  );

  const handleSelectSlot = useCallback((slot: AvailableTimeSlot) => {
    setSelectedTimeSlot(slot);
  }, []);

  const renderStepContent = () => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return (
          <ProductsStep
            businessId={businessId}
            employeeId={employeeId}
            selectedItems={selectedItems}
            scrollOffset={SCROLL_OFFSET}
            onAdd={handleSelectItem}
          />
        );
      case BookingStepEnum.SPECIALISTS:
        return (
          <Specialists
            selectedItems={selectedItems}
            employees={businessEmployees}
            selectedEmployeeId={selectedEmployeeId}
            onChangeSelectedEmployeeId={handleChangeEmployeeId}
          />
        );
      case BookingStepEnum.DATE_AND_HOUR:
        return (
          <AvailabilityStep
            userId={selectedEmployeeId ?? businessOwnerId}
            slotDuration={sumBy(selectedItems, "variantDuration")}
            selectedTimeSlot={selectedTimeSlot}
            onSelectTimeSlot={handleSelectSlot}
          />
        );
      case BookingStepEnum.CONFIRM:
        return <ConfirmStep />;
      default:
        return null;
    }
  };

  const isNextDisabled = useMemo(() => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return selectedItems.length === 0;

      case BookingStepEnum.SPECIALISTS:
        if (selectedEmployeeId === null) return true;

        const hasIncompleteServices = selectedItems.some((item) => {
          const offering = item.offerings.find(
            (o) => o.user_id === selectedEmployeeId
          );
          return !offering;
        });

        return hasIncompleteServices;

      case BookingStepEnum.DATE_AND_HOUR:
        return selectedTimeSlot === null;

      case BookingStepEnum.CONFIRM:
        return false;

      default:
        return true;
    }
  }, [currentStep, selectedItems, selectedEmployeeId, selectedTimeSlot]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <BookingAppBar onBack={() => router.back()} />
      <Container maxWidth="xl">
        <BookingBreadcrumbs currentStep={currentStep} employeeId={employeeId} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
            gap: 8,
            alignItems: "start",
          }}
        >
          <Box>{renderStepContent()}</Box>

          <BookingCart
            businessSummary={businessSummary}
            selectedItems={selectedItems}
            selectedEmployeeId={selectedEmployeeId}
            currentStep={currentStep}
            isNextDisabled={isNextDisabled}
            isLoadingNext={isPending}
            onNext={handleNext}
            onBack={handleBack}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default BookingModule;
