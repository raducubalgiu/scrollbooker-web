"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import {
  Box,
  Breadcrumbs,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "./components/BookingAppBar";
import BookingSidebar from "./components/BookingSidebar";
import { useScrollSync } from "./useScrollSync";
import ProductsStep from "./steps/Products/ProductsStep";
import AvailabilityStep from "./steps/Availability/AvailabilityStep";

type BookingModuleProps = {
  businessId: number;
  userId: number | null;
};

const SCROLL_OFFSET = 180;
const SIDEBAR_WIDTH = 600;

enum BookingStepEnum {
  SERVICES,
  SPECIALISTS,
  DATE_AND_HOUR,
  CONFIRM,
}

const BookingModule = ({ businessId, userId }: BookingModuleProps) => {
  const router = useRouter();
  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: ["business-products", businessId, !!userId],
    url: businessId ? `/api/businesses/${businessId}/products` : "",
    options: { enabled: !!businessId },
  });

  const businessProducts = useMemo(() => data ?? [], [data]);
  const sync = useScrollSync(businessProducts, SCROLL_OFFSET);

  const [currentStep, setCurrentStep] = useState<BookingStepEnum>(
    BookingStepEnum.DATE_AND_HOUR
  );

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case BookingStepEnum.SERVICES:
        return (
          <ProductsStep
            sync={sync}
            businessProducts={businessProducts}
            scrollOffset={SCROLL_OFFSET}
          />
        );
      case BookingStepEnum.SPECIALISTS:
        return <></>;
      case BookingStepEnum.DATE_AND_HOUR:
        return <AvailabilityStep />;
      case BookingStepEnum.CONFIRM:
        return <></>;
      default:
        return null;
    }
  }, []);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" p={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <BookingAppBar onBack={() => router.back()} />
      <Container maxWidth="xl">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator="›"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              mx: 2,
            },
          }}
        >
          <Link
            underline="hover"
            color="text.primary"
            href="/"
            style={{ fontSize: 20, fontWeight: 600 }}
          >
            Servicii
          </Link>
          <Typography sx={{ color: "text.secondary", fontSize: 20 }}>
            Profesioniști
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 20 }}>
            Data și Ora
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: 20 }}>
            Confirmare
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
            gap: 8,
          }}
        >
          {stepContent}

          <BookingSidebar />
        </Box>
      </Container>
    </Box>
  );
};

export default BookingModule;
