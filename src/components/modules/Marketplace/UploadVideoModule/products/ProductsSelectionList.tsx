import React from "react";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Tooltip,
  Theme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { find } from "lodash";
import {
  BusinessProductsResponse,
  Product,
  ProductUtils,
} from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";

type ProductsSelectionListProps = {
  activeGroup: BusinessProductsResponse | undefined;
  localSelectedProducts: Product[];
  onToggleProduct: (product: Product, isSelected: boolean) => void;
};

const ProductsSelectionList = ({
  activeGroup,
  localSelectedProducts,
  onToggleProduct,
}: ProductsSelectionListProps) => {
  if (!activeGroup) return null;

  return (
    <Box sx={styles.listContainer}>
      <Stack spacing={2}>
        {activeGroup.products.map((prod) => {
          const isSelected = !!find(localSelectedProducts, { id: prod.id });
          const filtersText = ProductUtils.getFiltersSummary(prod);
          const { has_different_prices, starting_offering } = prod;

          return (
            <Box
              key={prod.id}
              sx={(theme) => styles.cardItem(theme, isSelected)}
            >
              <Stack sx={styles.cardContent}>
                <Box sx={styles.textColumn}>
                  <Typography fontSize={20} fontWeight={600} noWrap>
                    {prod.name}
                  </Typography>

                  {filtersText && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{ mt: 0.5 }}
                    >
                      {filtersText}
                    </Typography>
                  )}

                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap={1}
                    mt={1.5}
                  >
                    <Typography fontSize={18} fontWeight={600}>
                      {has_different_prices && "de la"}{" "}
                      {`${formatPrice(starting_offering.price_with_discount)} RON`}
                    </Typography>
                    {starting_offering.discount > 0 && (
                      <>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ textDecoration: "line-through" }}
                        >
                          {formatPrice(starting_offering.price)}
                        </Typography>
                        <Typography fontWeight={600} color="error.main">
                          (-{starting_offering.discount}%)
                        </Typography>
                      </>
                    )}
                  </Stack>
                </Box>

                <IconButton
                  size="large"
                  disabled={!isSelected && localSelectedProducts.length >= 5}
                  onClick={() => onToggleProduct(prod, isSelected)}
                >
                  {isSelected ? (
                    <Tooltip title="Elimină">
                      <CheckCircleRoundedIcon
                        fontSize="large"
                        color="primary"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip
                      title={
                        localSelectedProducts.length >= 5
                          ? "Limita atinsă"
                          : "Adaugă"
                      }
                    >
                      <AddRoundedIcon fontSize="large" />
                    </Tooltip>
                  )}
                </IconButton>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProductsSelectionList;

const styles = {
  listContainer: {
    minHeight: 400,
    px: 2,
  },
  cardItem: (theme: Theme, isSelected: boolean) => {
    const isDark = theme.palette.mode === "dark";
    const baseBg = isDark ? "background.default" : "background.paper";
    const selectedBg = "background.default";

    return {
      bgcolor: isSelected ? selectedBg : baseBg,
      p: 2.5,
      borderRadius: 2.5,
      border: 1.5,
      borderColor: "divider",
    };
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },
  textColumn: {
    minWidth: 0,
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    mt: 1.5,
  },
  originalPrice: {
    textDecoration: "line-through",
  },
} as const;
