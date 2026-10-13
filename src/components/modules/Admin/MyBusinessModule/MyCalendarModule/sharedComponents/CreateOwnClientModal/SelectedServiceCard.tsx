import React from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";
import { SelectedVariant } from "./createOwnClientTypes";

type SelectedServiceCardProps = {
  variant: SelectedVariant;
  onRemove: () => void;
};

const SelectedServiceCard = ({ variant, onRemove }: SelectedServiceCardProps) => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        p: 2.5,
        borderRadius: 2.5,
        border: 1.5,
        borderColor: "divider",
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            fontWeight={700}
            noWrap
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {variant.productName} · {variant.variantName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ProductUtils.getDurationText(variant.duration)}
          </Typography>

          <Typography fontSize={{ xs: 17, lg: 18 }} fontWeight={600} mt={1.5}>
            {formatPrice(variant.priceWithDiscount)} RON
          </Typography>
        </Box>

        <Tooltip title="Elimină">
          <IconButton size="large" onClick={onRemove}>
            <CloseRoundedIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default SelectedServiceCard;
