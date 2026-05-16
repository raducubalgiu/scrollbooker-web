import Modal from "@/components/core/Modal/Modal";
import { SelectedBookingItem } from "@/components/modules/Marketplace/BookingModule/BookingModule";
import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import ProductDetailFooter from "./ProductDetailFooter";
import ProductDetailVariantsOptions from "./ProductDetailVariantsOptions";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onAdd: (item: SelectedBookingItem) => void;
};

const ProductDetailModal = ({
  product,
  open,
  onClose,
  onAdd,
}: ProductDetailModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants[0]?.id || ""
  );

  const currentVariant = product?.variants.find(
    (v) => v.id === Number(selectedVariant)
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedVariant(event.target.value);
  };

  const handleAddClick = () => {
    if (!product || !currentVariant) return;

    onAdd({
      productId: product.id,
      variantId: currentVariant.id,
      variantDuration: currentVariant.duration,
      offerings: currentVariant.offerings,
      productName: product.name,
      variantName: currentVariant.name,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      dividers={false}
      customFooter={
        <ProductDetailFooter
          currentVariant={currentVariant}
          durationText={
            currentVariant?.duration
              ? ProductUtils.getDurationText(currentVariant?.duration)
              : ""
          }
          onHandleAdd={handleAddClick}
        />
      }
    >
      <Stack p={2.5}>
        <Typography variant="h2" fontWeight={600} mb={2.5}>
          {product?.name}
        </Typography>
        {product?.description && (
          <Typography color="text.secondary">{product?.description}</Typography>
        )}
        <Stack spacing={4} mt={5} mb={7.5}>
          {product?.filters.map((filter) => {
            return (
              <Box key={filter.id}>
                <Typography variant="h6" fontWeight={600} mb={1.5}>
                  {filter.name}
                </Typography>

                {filter.sub_filters.map((sub) => {
                  return (
                    <Tooltip key={sub.id} title={sub?.description}>
                      <Chip
                        label={sub.name}
                        variant="outlined"
                        size="medium"
                        sx={(theme) => ({
                          fontWeight: 600,
                          borderRadius: 50,
                          fontSize: 16,
                          py: 2.5,
                          px: 0.5,
                          mr: 1,
                          borderWidth: 1,
                          borderColor: theme.palette.divider,
                          bgcolor: "transparent",
                          transition: "all 0.2s ease",
                          cursor: "default",

                          "&:hover": {
                            bgcolor: theme.palette.action.hover,
                          },
                        })}
                      />
                    </Tooltip>
                  );
                })}
              </Box>
            );
          })}

          {(product?.variants?.length ?? 0) > 1 && (
            <ProductDetailVariantsOptions
              selectedVariantId={selectedVariant}
              variants={product?.variants ?? []}
              onHandleChange={handleChange}
            />
          )}
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ProductDetailModal;
