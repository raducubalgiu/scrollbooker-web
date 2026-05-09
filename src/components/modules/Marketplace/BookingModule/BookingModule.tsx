"use client";

import { Box, Container, SelectChangeEvent, Typography } from "@mui/material";
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

type BookingModuleProps = {
  businessId: number;
  businessOwnerId: number;
  employeeId: number | null;
  businessEmployees: BusinessEmployee[];
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
  offering: ProductOffering;
  productName: string;
  variantName: string;
}

const BookingModule = ({
  businessId,
  businessOwnerId,
  employeeId,
  businessEmployees,
}: BookingModuleProps) => {
  const router = useRouter();

  const [selectedItems, setSelectedItems] = useState<SelectedBookingItem[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    businessEmployees[0]?.id ?? null
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
        router.push(`/appointments/${appointment.id}`);
      },
    },
  });

  const handleSelectItem = useCallback((item: SelectedBookingItem) => {
    setSelectedItems((prev) => {
      const exists = prev.find((i) => i.productId === item.productId);
      if (exists) {
        return prev.filter((i) => i.productId !== item.productId);
      }
      return [...prev, item];
    });
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep === BookingStepEnum.CONFIRM) {
      const { start_date_utc, end_date_utc } = selectedTimeSlot || {};

      if (!start_date_utc || !end_date_utc) return;

      const body: ScrollBookerAppointmentCreate = {
        start_date: start_date_utc,
        end_date: end_date_utc,
        product_variants: selectedItems.map((item) => {
          return {
            id: item.variantId,
            offering: { user_id: item.offering.user_id },
          };
        }),
        payment_currency_id: 1,
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
        return (
          <Box sx={{ minWidth: 0 }}>
            <Typography fontWeight={800} fontSize={47.5} mt={3}>
              Confirmare
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = useMemo(() => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return selectedItems.length === 0;

      case BookingStepEnum.SPECIALISTS:
        return selectedEmployeeId === null;

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
            selectedItems={selectedItems}
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
