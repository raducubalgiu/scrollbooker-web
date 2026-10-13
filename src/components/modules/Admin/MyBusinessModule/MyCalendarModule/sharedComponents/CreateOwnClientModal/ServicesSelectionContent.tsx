"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { SelectedVariant } from "./createOwnClientTypes";
import ServiceVariantRow from "./ServiceVariantRow";

type ServicesSelectionContentProps = {
  businessId: number;
  selectedVariants: SelectedVariant[];
  onToggleVariant: (variant: SelectedVariant) => void;
};

const ServicesSelectionContent = ({
  businessId,
  selectedVariants,
  onToggleVariant,
}: ServicesSelectionContentProps) => {
  const { data, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId,
    onlyServicesWithProducts: true,
  });

  const groups = data?.data ?? [];

  if (isLoading) {
    return <Typography sx={styles.message}>Se încarcă...</Typography>;
  }

  if (groups.length === 0) {
    return (
      <Typography sx={styles.message}>
        Nu ai niciun serviciu configurat încă.
      </Typography>
    );
  }

  return (
    <Stack spacing={2.5}>
      {groups.map((group) => (
        <Box key={group.service.id}>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {group.service.name}
          </Typography>

          <Stack sx={{ mt: 1 }}>
            {group.products.map((product) =>
              product.variants.map((variant) => {
                const selectedVariant: SelectedVariant = {
                  productId: product.id,
                  productName: product.name,
                  variantId: variant.id,
                  variantName: variant.name,
                  duration: variant.duration,
                  priceWithDiscount: variant.starting_offering.price_with_discount,
                };

                return (
                  <ServiceVariantRow
                    key={variant.id}
                    productName={product.name}
                    variant={variant}
                    isSelected={selectedVariants.some(
                      (v) => v.variantId === variant.id
                    )}
                    onClick={() => onToggleVariant(selectedVariant)}
                  />
                );
              })
            )}
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ServicesSelectionContent;

const styles = {
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
