"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useGetProductsByBusinessAndEmployee } from "@/controllers/booking/product.controller";
import { SelectedVariant } from "./createOwnClientTypes";
import ServiceVariantRow from "./ServiceVariantRow";

type SelectServicesDrawerProps = {
  open: boolean;
  businessId: number;
  selectedVariants: SelectedVariant[];
  onClose: () => void;
  onConfirm: (variants: SelectedVariant[]) => void;
};

const SelectServicesDrawer = ({
  open,
  businessId,
  selectedVariants,
  onClose,
  onConfirm,
}: SelectServicesDrawerProps) => {
  const [pendingVariants, setPendingVariants] =
    useState<SelectedVariant[]>(selectedVariants);

  useEffect(() => {
    if (open) setPendingVariants(selectedVariants);
  }, [open, selectedVariants]);

  const { data, isLoading } = useGetProductsByBusinessAndEmployee({
    businessId,
    onlyServicesWithProducts: true,
  });

  const toggleVariant = (variant: SelectedVariant) => {
    setPendingVariants((prev) => {
      const isSelected = prev.some((v) => v.variantId === variant.variantId);
      if (isSelected) {
        return prev.filter((v) => v.variantId !== variant.variantId);
      }
      return [...prev, variant];
    });
  };

  const groups = data?.data ?? [];

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Selectează serviciile</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>
        {isLoading && (
          <Typography sx={styles.message}>Se încarcă...</Typography>
        )}

        {!isLoading && groups.length === 0 && (
          <Typography sx={styles.message}>
            Nu ai niciun serviciu configurat încă.
          </Typography>
        )}

        {!isLoading &&
          groups.map((group) => (
            <Box key={group.service.id} sx={{ mb: 2.5 }}>
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
                      priceWithDiscount:
                        variant.starting_offering.price_with_discount,
                    };

                    return (
                      <ServiceVariantRow
                        key={variant.id}
                        productName={product.name}
                        variant={variant}
                        isSelected={pendingVariants.some(
                          (v) => v.variantId === variant.id
                        )}
                        onClick={() => toggleVariant(selectedVariant)}
                      />
                    );
                  })
                )}
              </Stack>
            </Box>
          ))}
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={pendingVariants.length === 0}
          onClick={() => onConfirm(pendingVariants)}
        >
          Adaugă{pendingVariants.length > 0 ? ` (${pendingVariants.length})` : ""}
        </Button>
      </Box>
    </Drawer>
  );
};

export default SelectServicesDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    p: 2,
    pt: 0,
    overflowY: "auto",
  },
  message: {
    textAlign: "center",
    color: "text.secondary",
    p: 2.5,
  },
};
