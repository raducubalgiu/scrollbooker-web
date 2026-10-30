import React from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { SelectedVariant } from "../createOwnClientTypes";

type SelectedServiceCardProps = {
  variant: SelectedVariant;
  onRemove: () => void;
};

const SelectedServiceCard = ({ variant, onRemove }: SelectedServiceCardProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={styles.card}>
      <Box sx={styles.textColumn}>
        <Typography fontSize={16} fontWeight={600} noWrap>
          {variant.productName}
        </Typography>

        <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.2 }}>
          {[ProductUtils.getDurationText(variant.duration), variant.filtersSummary]
            .filter(Boolean)
            .join(" • ")}
        </Typography>

        <Stack direction="row" alignItems="center" gap={1} mt={1}>
          <Typography fontWeight={600}>
            {formatPrice(variant.priceWithDiscount)} RON
          </Typography>
          {variant.discount > 0 && (
            <>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                {formatPrice(variant.price)}
              </Typography>
              <Typography variant="body2" color="error.main">
                (-{variant.discount}%)
              </Typography>
            </>
          )}
        </Stack>
      </Box>

      <Tooltip title="Elimină serviciul">
        <IconButton onClick={onRemove} color="error" sx={styles.removeButton}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default SelectedServiceCard;

const styles = {
  card: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
    px: 2,
    py: 1.5,
  },
  textColumn: {
    minWidth: 0,
    flex: 1,
  },
  removeButton: {
    bgcolor: "background.default",
    flexShrink: 0,
    "&:hover": { bgcolor: "action.hover" },
  },
} as const;
