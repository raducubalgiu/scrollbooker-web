import { Product } from "@/ts/models/booking/product/Product";
import { Box, Chip, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import React from "react";

type BusinessProductCardProps = {
  product: Product;
};

const BusinessProductCard = ({ product }: BusinessProductCardProps) => {
  const { name, price_with_discount, duration } = product;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 5,
        mb: 1.5,
        bgcolor: "secondary.main",
        cursor: "pointer",
      }}
      role="button"
      tabIndex={0}
      aria-label={`prod.name ${name} price ${price_with_discount} RON duration ${duration} minutes`}
    >
      <Stack spacing={0.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {price_with_discount} RON
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            icon={<AccessTimeOutlinedIcon />}
            label={`${duration} min`}
          />
          <Typography variant="body2" color="text.secondary">
            Caini & Pisici • Standard
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BusinessProductCard;
