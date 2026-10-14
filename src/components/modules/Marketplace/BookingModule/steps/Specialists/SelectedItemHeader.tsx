import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";

type SelectedItemHeaderProps = {
  productName: string;
  variantName: string;
  variantDuration: number;
  hasOffering: boolean;
  price: number | undefined;
};

const SelectedItemHeader = ({
  productName,
  variantName,
  variantDuration,
  hasOffering,
  price,
}: SelectedItemHeaderProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography fontWeight={700}>{productName}</Typography>
        <Typography color="text.secondary" variant="body2">
          {variantName} • {ProductUtils.getDurationText(variantDuration)}
        </Typography>
      </Box>

      {hasOffering && price !== undefined && (
        <Typography variant="h6" fontWeight={700}>
          {formatPrice(price)} RON
        </Typography>
      )}
    </Stack>
  );
};

export default SelectedItemHeader;
