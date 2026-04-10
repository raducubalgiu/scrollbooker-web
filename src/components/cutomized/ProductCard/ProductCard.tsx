import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
};

const ProductCard = ({ product, isSelected }: ProductCardProps) => {
  const { name, description, price, price_with_discount, discount } = product;

  const filtersText = ProductUtils.getFiltersSummary(product);

  return (
    <Box
      sx={{
        bgcolor: isSelected ? "background.default" : "background.paper",
        p: 1.5,
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Typography fontSize={18} fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {filtersText}
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
            <Typography fontSize={18} fontWeight={600}>
              {formatPrice(price_with_discount)} RON
            </Typography>
            {discount > 0 && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  {formatPrice(price)}
                </Typography>
                <Typography fontWeight={600} color="error.main">
                  (-{discount}%)
                </Typography>
              </>
            )}
          </Stack>
        </Box>

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
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
        </Protected>
      </Stack>

      {description && (
        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
