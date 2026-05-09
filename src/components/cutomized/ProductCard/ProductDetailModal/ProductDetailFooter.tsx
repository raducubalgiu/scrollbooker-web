import { formatPrice } from "@/utils/formatPrice";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type ProductDetailFooterProps = {
  price: number | undefined;
  durationText: string;
  onHandleAdd: () => void;
};

const ProductDetailFooter = ({
  price,
  durationText,
  onHandleAdd,
}: ProductDetailFooterProps) => {
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
          {formatPrice(price)} RON
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
