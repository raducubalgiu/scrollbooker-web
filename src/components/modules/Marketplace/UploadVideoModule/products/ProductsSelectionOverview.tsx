import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

type ProductsSelectionOverviewProps = {
  localSelectedProductsCount: number;
  onReset: () => void;
  onConfirm: () => void;
};

const ProductsSelectionOverview = ({
  localSelectedProductsCount,
  onReset,
  onConfirm,
}: ProductsSelectionOverviewProps) => {
  const disabled = localSelectedProductsCount === 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pb: 2.5, px: 1 }}
    >
      <Box>
        <Typography fontWeight={700} variant="h5">
          Ai selectat {localSelectedProductsCount}{" "}
          {localSelectedProductsCount === 1 ? "serviciu" : "servicii"}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Maxim 5 servicii pot fi atașate video-ului
        </Typography>
      </Box>

      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Button disabled={disabled} onClick={onReset}>
          Reset
        </Button>
        <Button
          variant="contained"
          disabled={disabled}
          disableElevation
          onClick={onConfirm}
          sx={styles.button}
        >
          Adaugă servicii
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductsSelectionOverview;

const styles = {
  button: {
    borderRadius: 2,
    textTransform: "none",
    px: 3,
    fontWeight: 600,
  },
};
