import Modal from "@/components/core/Modal/Modal";
import { Product } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";

type ProductDetailModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
};

const ProductDetailModal = ({
  product,
  open,
  onClose,
}: ProductDetailModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      dividers={false}
    >
      <Stack p={2.5}>
        <Typography variant="h4" fontWeight={500} mb={2.5}>
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
        </Stack>

        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Stack flexDirection="row" alignItems="center" gap={1}>
              <Typography variant="h5" fontWeight={600}>
                {formatPrice(product?.price_with_discount)} RON
              </Typography>
              {product && product.discount > 0 && (
                <>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    {formatPrice(product?.price)}
                  </Typography>
                  <Typography fontWeight={600} color="error.main">
                    (-{product?.discount}%)
                  </Typography>
                </>
              )}
            </Stack>
            <Typography color="text.secondary">
              {product?.duration}min
            </Typography>
          </Stack>
          <Button
            variant="contained"
            disableElevation
            sx={{ py: 1.75, px: 3, fontSize: 18, fontWeight: 600 }}
          >
            Adaugă
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ProductDetailModal;
