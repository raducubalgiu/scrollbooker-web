import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import {
  Box,
  Button,
  IconButton,
  lighten,
  Stack,
  SxProps,
  Theme,
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
  showDescription?: boolean;
  onOpenDetail: () => void;
  onNavigateToBooking: (product: Product) => void;
  sx?: SxProps<Theme>;
};

const ProductCard = ({
  product,
  isSelected,
  showIcon,
  showDescription = true,
  onOpenDetail,
  onNavigateToBooking,
  sx = {},
}: ProductCardProps) => {
  const { name, description, has_different_prices } = product;

  const filtersText = ProductUtils.getFiltersSummary(product);
  const displayedPrice = ProductUtils.getPrice(product);
  const displayed_price_with_discount =
    ProductUtils.getPriceWithDiscount(product);
  const displayedDiscount = ProductUtils.getDiscount(product);

  return (
    <Box
      sx={[
        (theme) => {
          const isDark = theme.palette.mode === "dark";
          const baseBg = isDark ? "background.default" : "background.paper";
          const selectedBg = "background.default";

          return {
            bgcolor: isSelected ? selectedBg : baseBg,
            p: 2.5,
            borderRadius: 2.5,
            border: 1.5,
            borderColor: "divider",
            cursor: "pointer",
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: isDark
                ? lighten(theme.palette.background.default, 0.1)
                : lighten(theme.palette.background.default, 0.2),
            },
          };
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      onClick={onOpenDetail}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            fontSize={19}
            fontWeight={500}
            noWrap
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {filtersText}
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={1} mt={1.5}>
            <Typography fontSize={18} fontWeight={600}>
              {has_different_prices && "de la"} {displayed_price_with_discount}{" "}
              RON
            </Typography>
            {displayedDiscount > 0 && (
              <>
                <Typography
                  variant="body1"
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

      {description && showDescription && (
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
            maxWidth: 200,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
