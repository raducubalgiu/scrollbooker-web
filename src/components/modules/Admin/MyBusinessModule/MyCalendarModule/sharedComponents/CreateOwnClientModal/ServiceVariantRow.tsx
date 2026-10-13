import React from "react";
import { Checkbox, Stack, Typography } from "@mui/material";
import { ProductVariant } from "@/ts/models/booking/product/Product";

type ServiceVariantRowProps = {
  productName: string;
  variant: ProductVariant;
  isSelected: boolean;
  onClick: () => void;
};

const ServiceVariantRow = ({
  productName,
  variant,
  isSelected,
  onClick,
}: ServiceVariantRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      onClick={onClick}
      sx={{
        p: 1,
        borderRadius: 2,
        cursor: "pointer",
        bgcolor: isSelected ? "action.selected" : "transparent",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Checkbox checked={isSelected} size="small" sx={{ p: 0.5 }} />

      <Stack sx={{ flex: 1 }}>
        <Typography fontWeight={600}>
          {productName} · {variant.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {variant.duration} min
        </Typography>
      </Stack>

      <Typography fontWeight={700}>
        {variant.starting_offering.price_with_discount} lei
      </Typography>
    </Stack>
  );
};

export default ServiceVariantRow;
