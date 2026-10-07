import { ChevronRight } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";

type ProductVariantCardProps = {
  index: number;
  control: Control<ProductFormValues>;
  onClick: () => void;
};

const ProductVariantCard = ({
  index,
  control,
  onClick,
}: ProductVariantCardProps) => {
  const name = useWatch({ control, name: `variants.${index}.name` });
  const duration = useWatch({ control, name: `variants.${index}.duration` });
  const offerings = useWatch({ control, name: `variants.${index}.offerings` });

  const activePrices = (offerings ?? [])
    .filter((offering) => offering.is_offering)
    .map((offering) => Number(offering.price_with_discount) || 0);

  const cheapestPrice = activePrices.length ? Math.min(...activePrices) : 0;

  return (
    <Box component="button" type="button" onClick={onClick} sx={styles.container}>
      <Box minWidth={0}>
        <Typography fontWeight="700" noWrap textAlign="left">
          {name || `Opțiunea #${index + 1}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {duration
            ? ProductUtils.getDurationText(Number(duration))
            : "Fără durată setată"}
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" gap={0.5} flexShrink={0}>
        <Typography fontWeight="700">{`${formatPrice(cheapestPrice)} RON`}</Typography>
        <ChevronRight color="action" />
      </Stack>
    </Box>
  );
};

export default ProductVariantCard;

const styles = {
  container: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    p: 2,
    borderRadius: "12px",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
    cursor: "pointer",
    textAlign: "left",
    "&:hover": {
      borderColor: "primary.main",
    },
  },
};
