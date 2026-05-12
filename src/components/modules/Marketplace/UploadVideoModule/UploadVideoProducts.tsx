import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import React from "react";
import ProductsInfoSection from "./ProductsInfoSection";
import EmptyProductsSection from "./EmptyProductsSection";
import { Product } from "@/ts/models/booking/product/Product";
import { isEmpty } from "lodash";

type UploadVideoProductsProps = {
  selectedProducts: Product[];
  onOpenProducts: () => void;
};

const UploadVideoProducts = ({
  selectedProducts,
  onOpenProducts,
}: UploadVideoProductsProps) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600} mb={2.5}>
        Servicii
      </Typography>

      <ProductsInfoSection />

      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Servicii selectate ({selectedProducts.length}/5)
      </Typography>

      {isEmpty(selectedProducts) && (
        <EmptyProductsSection onOpenProducts={onOpenProducts} />
      )}

      {!isEmpty(selectedProducts) && (
        <Stack spacing={1.5}>
          <List disablePadding>
            {selectedProducts.map((product) => (
              <ListItem
                key={product.id}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 3,
                  mb: 1,
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "action.hover" },
                }}
                secondaryAction={
                  <Tooltip title="Elimină serviciul">
                    <IconButton
                      edge="end"
                      onClick={() => {}}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemText
                  primary={product.name}
                  primaryTypographyProps={{
                    variant: "body2",
                    fontWeight: 600,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Stack>
      )}
    </Box>
  );
};

export default UploadVideoProducts;
