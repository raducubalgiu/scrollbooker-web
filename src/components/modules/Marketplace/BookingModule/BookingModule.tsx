"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import { BusinessProductsResponse } from "@/ts/models/booking/product/Product";
import { Box, CircularProgress, Container } from "@mui/material";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "./components/BookingAppBar";
import BookingSidebar from "./components/BookingSidebar";
import { useScrollSync } from "./useScrollSync";
import ProductsStep from "./steps/Products/ProductsStep";

type BookingModuleProps = {
  businessId: number;
  userId: number | null;
};

const SCROLL_OFFSET = 180;
const SIDEBAR_WIDTH = 600;

const BookingModule = ({ businessId, userId }: BookingModuleProps) => {
  const router = useRouter();
  const { data, isLoading } = useCustomQuery<BusinessProductsResponse[]>({
    key: ["business-products", businessId, !!userId],
    url: businessId ? `/api/businesses/${businessId}/products` : "",
    options: { enabled: !!businessId },
  });

  const businessProducts = useMemo(() => data ?? [], [data]);
  const sync = useScrollSync(businessProducts, SCROLL_OFFSET);

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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
            gap: 8,
          }}
        >
          <ProductsStep
            sync={sync}
            businessProducts={businessProducts}
            scrollOffset={SCROLL_OFFSET}
          />

          <BookingSidebar />
        </Box>
      </Container>
    </Box>
  );
};

export default BookingModule;
