import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import {
  Box,
  Button,
  IconButton,
  lighten,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import React from "react";
import Protected from "../Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  showIcon: boolean;
  onOpenDetail: () => void;
  onNavigateToBooking: (product: Product) => void;
};

const ProductCard = ({
  product,
  isSelected,
  showIcon,
  onOpenDetail,
  onNavigateToBooking,
}: ProductCardProps) => {
  const { name, description, has_different_offerings } = product;

  const filtersText = ProductUtils.getFiltersSummary(product);
  const displayedPrice = ProductUtils.getPrice(product);
  const displayed_price_with_discount =
    ProductUtils.getPriceWithDiscount(product);
  const displayedDiscount = ProductUtils.getDiscount(product);

  return (
    <Box
      sx={(theme) => {
        const isDark = theme.palette.mode === "dark";

        const baseBg = isDark ? "background.default" : "background.paper";

        const selectedBg = "background.default";

        return {
          bgcolor: isSelected ? selectedBg : baseBg,
          p: 1.5,
          borderRadius: 5,
          cursor: "pointer",
          transition: "all 0.2s ease",

          "&:hover": {
            bgcolor: isDark
              ? lighten(theme.palette.background.default, 0.1)
              : lighten(theme.palette.background.default, 0.2),
          },
        };
      }}
      onClick={onOpenDetail}
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
              {has_different_offerings && "de la"}{" "}
              {displayed_price_with_discount} RON
            </Typography>
            {displayedDiscount > 0 && (
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  {displayedPrice}
                </Typography>
                <Typography fontWeight={600} color="error.main">
                  (-{displayedDiscount}%)
                </Typography>
              </>
            )}
          </Stack>
        </Box>

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          {showIcon ? (
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
          ) : (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              size="large"
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToBooking(product);
              }}
            >
              Rezervă
            </Button>
          )}
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
