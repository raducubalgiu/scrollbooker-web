import {
  ProductUtils,
  ProductVariant,
} from "@/ts/models/booking/product/Product";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type ProductDetailFooterProps = {
  currentVariant: ProductVariant | undefined;
  onHandleAdd: () => void;
};

const ProductDetailFooter = ({
  currentVariant,
  onHandleAdd,
}: ProductDetailFooterProps) => {
  const { has_different_prices, starting_offering, duration } =
    currentVariant || {};

  const displayedPrice = has_different_prices
    ? `de la ${starting_offering?.price_with_discount} RON`
    : `${starting_offering?.price_with_discount} RON`;

  const durationText = duration ? ProductUtils.getDurationText(duration) : "";

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      bgcolor="background.default"
      sx={styles.container}
    >
      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={600}>
          {displayedPrice}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {durationText}
        </Typography>
      </Stack>

      <Button
        variant="contained"
        disableElevation
        sx={styles.addButton}
        onClick={onHandleAdd}
      >
        Adaugă
      </Button>
    </Stack>
  );
};

export default ProductDetailFooter;

const styles = {
  container: {
    zIndex: 1,
    width: "100%",
    p: { xs: 2, md: 3 },
    borderTop: 1,
    borderColor: "divider",
  },
  addButton: {
    py: { xs: 1.25, md: 1.75 },
    px: { xs: 2.5, md: 3 },
    fontSize: { xs: 15, md: 18 },
    fontWeight: 600,
  },
};
