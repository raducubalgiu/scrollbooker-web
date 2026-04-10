import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
};

const ProductCard = ({ product, isSelected }: ProductCardProps) => {
  const { name, price_with_discount } = product;

  const filtersText = ProductUtils.getFiltersSummary(product);

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        bgcolor: isSelected ? "background.default" : "background.paper",
        p: 1.5,
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      <Box>
        <Typography fontSize={18} fontWeight={600}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filtersText}
        </Typography>

        <Typography fontSize={18} fontWeight={600} mt={1.5}>
          {formatPrice(price_with_discount)} RON
        </Typography>
      </Box>

      <IconButton size="large">
        {isSelected ? (
          <Tooltip title="Elimină">
            <CheckCircleRoundedIcon fontSize="large" color="primary" />
          </Tooltip>
        ) : (
          <Tooltip title="Adaugă">
            <AddRoundedIcon fontSize="large" />
          </Tooltip>
        )}
      </IconButton>
    </Stack>
  );
};

export default ProductCard;
