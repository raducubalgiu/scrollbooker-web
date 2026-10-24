import { formatPrice } from "@/utils/formatPrice";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type ProductCardInfoProps = {
  name: string;
  summaryText: string;
  startingPrice: number;
  startingDiscount: number;
  startingPriceWithDiscount: number;
  hasDifferentPrices: boolean;
};

const ProductCardInfo = ({
  name,
  summaryText,
  startingPrice,
  startingDiscount,
  startingPriceWithDiscount,
  hasDifferentPrices,
}: ProductCardInfoProps) => {
  return (
    <Box sx={{ minWidth: 0, flex: 1 }}>
      <Typography
        fontWeight={700}
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {summaryText}
      </Typography>

      <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
        <Typography variant="body1" fontWeight={600}>
          {hasDifferentPrices && "de la "}
          {`${formatPrice(startingPriceWithDiscount)} RON`}
        </Typography>
        {startingDiscount > 0 && (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              {formatPrice(startingPrice)}
            </Typography>
            <Typography variant="body2" fontWeight={600} color="error.main">
              (-{startingDiscount}%)
            </Typography>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ProductCardInfo;
