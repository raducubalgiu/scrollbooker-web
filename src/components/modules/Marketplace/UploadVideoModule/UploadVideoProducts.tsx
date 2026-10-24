import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React from "react";
import EmptyProductsSection from "./EmptyProductsSection";
import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { isEmpty } from "lodash";
import { formatPrice } from "@/utils/formatPrice";

type UploadVideoProductsProps = {
  selectedProducts: Product[];
  onOpenProducts: () => void;
  onRemoveProduct: (product: Product) => void;
};

const UploadVideoProducts = ({
  selectedProducts,
  onOpenProducts,
  onRemoveProduct,
}: UploadVideoProductsProps) => {
  const hasProducts = !isEmpty(selectedProducts);

  return (
    <Box>
      <Stack
        mb={2}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack>
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontWeight={700}>
              Servicii atașate ({selectedProducts.length}/5)
            </Typography>

            <Button
              variant="text"
              size="small"
              onClick={onOpenProducts}
              sx={{ fontWeight: 700 }}
            >
              {hasProducts ? "Modifică" : "Adaugă"}
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary">
            Serviciile atașate acestui videoclip vor apărea primele in lista
            afișată userilor atunci cand doresc să facă o rezervare.
          </Typography>
        </Stack>
      </Stack>

      {!hasProducts ? (
        <EmptyProductsSection onOpenProducts={onOpenProducts} />
      ) : (
        <Stack spacing={1.5}>
          <List disablePadding>
            {selectedProducts.map((product) => {
              const filtersText = ProductUtils.getFiltersSummary(product);
              const { starting_offering, has_different_prices } = product;

              return (
                <ListItem
                  key={product.id}
                  sx={styles.listItem}
                  secondaryAction={
                    <Tooltip title="Elimină serviciul">
                      <IconButton
                        edge="end"
                        onClick={() => onRemoveProduct(product)}
                        color="error"
                      >
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Box sx={styles.textColumn}>
                        <Typography fontSize={16} fontWeight={600} noWrap>
                          {product.name}
                        </Typography>

                        {filtersText && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            noWrap
                            sx={{ mt: 0.2 }}
                          >
                            {filtersText}
                          </Typography>
                        )}

                        <Stack
                          flexDirection="row"
                          alignItems="center"
                          gap={1}
                          mt={1}
                        >
                          <Typography fontWeight={600}>
                            {has_different_prices && "de la"}{" "}
                            {`${formatPrice(starting_offering.price_with_discount)} RON`}
                          </Typography>
                          {starting_offering.discount > 0 && (
                            <>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                              >
                                {formatPrice(starting_offering.price)}
                              </Typography>
                              <Typography variant="body2" color="error.main">
                                (-{starting_offering.discount}%)
                              </Typography>
                            </>
                          )}
                        </Stack>
                      </Box>
                    }
                  />
                </ListItem>
              );
            })}
          </List>
        </Stack>
      )}
    </Box>
  );
};

export default UploadVideoProducts;

const styles = {
  listItem: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    mb: 1.5,
    bgcolor: "background.paper",
    "&:hover": { bgcolor: "action.hover" },
  },
  textColumn: {
    minWidth: 0,
    flex: 1,
    pr: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    mt: 0.5,
  },
  originalPrice: {
    textDecoration: "line-through",
  },
} as const;
