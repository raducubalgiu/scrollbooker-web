"use client";

import { Box, Container, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "./components/BookingAppBar";
import BookingSidebar from "./components/BookingSidebar";
import ProductsStep from "./steps/Products/ProductsStep";
import AvailabilityStep from "./steps/Availability/AvailabilityStep";
import BookingBreadcrumbs from "./components/BookingBreadcrumbs";
import Specialists from "./steps/Specialists/Specialists";

type BookingModuleProps = {
  businessId: number;
  userId: number | null;
};

const SCROLL_OFFSET = 180;
const SIDEBAR_WIDTH = 600;

export enum BookingStepEnum {
  SERVICES = 0,
  SPECIALISTS = 1,
  DATE_AND_HOUR = 2,
  CONFIRM = 3,
}

const BookingModule = ({ businessId, userId }: BookingModuleProps) => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<BookingStepEnum>(
    BookingStepEnum.SERVICES
  );

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return (
          <ProductsStep businessId={businessId} scrollOffset={SCROLL_OFFSET} />
        );
      case BookingStepEnum.SPECIALISTS:
        return <Specialists />;
      case BookingStepEnum.DATE_AND_HOUR:
        return <AvailabilityStep />;
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
  }, [currentStep, businessId]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <BookingAppBar onBack={() => router.back()} />
      <Container maxWidth="xl">
        <BookingBreadcrumbs currentStep={currentStep} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
            gap: 8,
            alignItems: "start",
          }}
        >
          <Box>{stepContent}</Box>

          <BookingSidebar
            currentStep={currentStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default BookingModule;
