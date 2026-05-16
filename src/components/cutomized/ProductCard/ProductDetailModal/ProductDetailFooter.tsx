import { ProductVariant } from "@/ts/models/booking/product/Product";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type ProductDetailFooterProps = {
  currentVariant: ProductVariant | undefined;
  durationText: string;
  onHandleAdd: () => void;
};

const ProductDetailFooter = ({
  currentVariant,
  durationText,
  onHandleAdd,
}: ProductDetailFooterProps) => {
  const { has_different_prices, starting_offering } = currentVariant || {};

  const displayedPrice = has_different_prices
    ? `de la ${starting_offering?.price_with_discount} RON`
    : `${starting_offering?.price_with_discount} RON`;

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.paper"
      sx={{
        zIndex: 1,
        width: "100%",
        p: 3,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={600}>
          {displayedPrice}
        </Typography>
        <Typography color="text.secondary">{durationText}</Typography>
      </Stack>

      <Button
        variant="contained"
        disableElevation
        sx={{ py: 1.75, px: 3, fontSize: 18, fontWeight: 600 }}
        onClick={onHandleAdd}
      >
        Adaugă
      </Button>
    </Stack>
  );
};

export default ProductDetailFooter;
