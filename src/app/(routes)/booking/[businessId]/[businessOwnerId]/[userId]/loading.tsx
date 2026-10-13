"use client";

import { Box, Container, Skeleton } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import BookingAppBar from "@/components/modules/Marketplace/BookingModule/components/BookingAppBar";
import ProductsStepSkeleton from "@/components/modules/Marketplace/BookingModule/steps/Products/ProductsStepSkeleton";
import {
  HEADER_HEIGHT,
  SIDEBAR_WIDTH,
} from "@/components/modules/Marketplace/BookingModule/BookingModule";

export default function BookingLoading() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <BookingAppBar headerHeight={HEADER_HEIGHT} onBack={() => router.back()} />

      <Container maxWidth="xl">
        <Skeleton
          variant="rounded"
          width={320}
          height={28}
          sx={{ display: { xs: "none", lg: "block" }, my: 3 }}
        />

        <Box sx={styles.container}>
          <Box sx={{ minWidth: 0, width: "100%", maxWidth: "100%" }}>
            <ProductsStepSkeleton />
          </Box>

          <Skeleton
            variant="rounded"
            sx={{
              display: { xs: "none", md: "block" },
              width: SIDEBAR_WIDTH,
              height: 420,
              borderRadius: 4,
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: `minmax(0, 1fr) ${SIDEBAR_WIDTH}px`,
    },
    gap: { xs: 2, md: 8 },
    alignItems: "start",
  },
};
