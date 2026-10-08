import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { alpha, Box, IconButton, Stack, Theme, Typography } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";

type ProductVariantCardProps = {
  index: number;
  control: Control<ProductFormValues>;
  onEdit: () => void;
  onDelete: () => void;
};

const ProductVariantCard = ({
  index,
  control,
  onEdit,
  onDelete,
}: ProductVariantCardProps) => {
  const name = useWatch({ control, name: `variants.${index}.name` });
  const duration = useWatch({ control, name: `variants.${index}.duration` });
  const offerings = useWatch({ control, name: `variants.${index}.offerings` });

  const activePrices = (offerings ?? [])
    .filter((offering) => offering.is_offering)
    .map((offering) => Number(offering.price_with_discount) || 0);

  const cheapestPrice = activePrices.length ? Math.min(...activePrices) : 0;

  return (
    <Box sx={styles.container}>
      <Box minWidth={0}>
        <Typography fontWeight="700" noWrap>
          {name || `Opțiunea #${index + 1}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {duration
            ? ProductUtils.getDurationText(Number(duration))
            : "Fără durată setată"}
          {" • "}
          {`${formatPrice(cheapestPrice)} RON`}
        </Typography>
      </Box>

      <Stack direction="row" gap={1} flexShrink={0}>
        <IconButton size="small" onClick={onEdit} sx={styles.editButton}>
          <EditOutlined fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={onDelete}
          sx={styles.deleteButton}
        >
          <DeleteOutline fontSize="small" />
        </IconButton>
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
  },
  editButton: {
    bgcolor: "action.hover",
  },
  deleteButton: {
    bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.08),
    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.16),
    },
  },
};
