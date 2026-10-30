import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import React, { useState } from "react";
import ProductCardInfo from "./ProductCardInfo";
import ProductCardSelectActions, {
  ProductCardSelection,
} from "./ProductCardSelectActions";
import ProductCardEditableActions from "./ProductCardEditableActions";

type ProductCardProps = {
  product: Product;
  selection?: ProductCardSelection;
  onBook?: () => void;
  shouldToggleDescription?: boolean;
  displayEditableActions?: boolean;
  isLoadingDelete?: boolean;
  onOpenDetail?: () => void;
  onEditProduct?: (productId: number) => void;
  onDeleteProduct?: (productId: number) => void;
  sx?: SxProps<Theme>;
};

const ProductCard = ({
  product,
  selection,
  onBook,
  shouldToggleDescription = false,
  displayEditableActions = false,
  isLoadingDelete = false,
  onOpenDetail,
  onEditProduct,
  onDeleteProduct,
  sx = {},
}: ProductCardProps) => {
  const { name, description, starting_offering, has_different_prices } =
    product;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const handleCardClick = () => {
    if (shouldToggleDescription) {
      setIsDescriptionExpanded((prev) => !prev);
      return;
    }
    onOpenDetail?.();
  };

  const filtersText = ProductUtils.getFiltersSummary(product);
  const durationText = ProductUtils.getDurationText(starting_offering.duration);
  const summaryText = filtersText
    ? `${durationText} • ${filtersText}`
    : durationText;

  return (
    <Box
      sx={[styles.container, ...(Array.isArray(sx) ? sx : [sx])]}
      onClick={handleCardClick}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <ProductCardInfo
          name={name}
          summaryText={summaryText}
          startingPrice={starting_offering.price}
          startingDiscount={starting_offering.discount}
          startingPriceWithDiscount={starting_offering.price_with_discount}
          hasDifferentPrices={has_different_prices}
        />

        {!displayEditableActions && (
          <ProductCardSelectActions selection={selection} onBook={onBook} />
        )}

        <ProductCardEditableActions
          isLoadingDelete={isLoadingDelete}
          displayEditableActions={displayEditableActions}
          onEditProduct={() => onEditProduct?.(product.id)}
          onDeleteProduct={() => onDeleteProduct?.(product.id)}
        />
      </Stack>

      {description && (
        <Typography
          variant="caption"
          color="text.secondary"
          mt={1}
          sx={
            shouldToggleDescription && isDescriptionExpanded
              ? {
                  whiteSpace: "pre-line",
                  overflow: "hidden",
                }
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }
          }
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;

const styles = {
  container: {
    bgcolor: "background.default",
    p: { xs: 1.5, md: 2.5 },
    borderRadius: 2.5,
    border: 1.5,
    borderColor: "divider",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor: { xs: "transparent", md: "background.paper" },
    },
  },
};
