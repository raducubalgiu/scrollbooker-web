import { ChangeEvent } from "react";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import { Product } from "@/ts/models/booking/product/Product";
import ProductDetailVariantsOptions from "./ProductDetailVariantsOptions";

type ProductDetailContentProps = {
  product: Product | null;
  selectedVariantId: number | string;
  onHandleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const ProductDetailContent = ({
  product,
  selectedVariantId,
  onHandleChange,
}: ProductDetailContentProps) => {
  return (
    <Stack sx={{ p: { xs: 2, md: 2.5 } }}>
      <Typography variant="h2" fontWeight={600} mb={{ xs: 1.5, md: 2.5 }}>
        {product?.name}
      </Typography>

      <Typography color="text.secondary">
        {product?.description
          ? product?.description
          : "Acest serviciu nu conține o descriere"}
      </Typography>

      <Stack
        spacing={{ xs: 2.5, md: 4 }}
        mt={{ xs: 3, md: 5 }}
        mb={{ xs: 4, md: 7.5 }}
      >
        {product?.filters.map((filter) => (
          <Box key={filter.id}>
            <Typography variant="h6" fontWeight={600} mb={1.5}>
              {filter.name}
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {filter.sub_filters.map((sub) => (
                <Tooltip key={sub.id} title={sub?.description}>
                  <Chip
                    label={sub.name}
                    variant="outlined"
                    sx={(theme) => ({
                      fontWeight: 600,
                      borderRadius: 50,
                      fontSize: { xs: 13, md: 16 },
                      py: { xs: 1.5, md: 2.5 },
                      px: 0.5,
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
              ))}
            </Stack>
          </Box>
        ))}

        {(product?.variants?.length ?? 0) > 1 && (
          <ProductDetailVariantsOptions
            selectedVariantId={selectedVariantId}
            variants={product?.variants ?? []}
            onHandleChange={onHandleChange}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ProductDetailContent;
