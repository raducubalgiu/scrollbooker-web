import { Product, ProductUtils } from "@/ts/models/booking/product/Product";
import { alpha, Box, Chip, Stack, Theme, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";

type BusinessProductCardProps = {
  product: Product;
};

const BusinessProductCard = ({ product }: BusinessProductCardProps) => {
  const { id, business_id, business_owner_id, name, starting_offering } =
    product;
  const filtersText = ProductUtils.getFiltersSummary(product);

  const navigateUrl = `/booking/${business_id}?businessOwnerId=${business_owner_id}&selectedServiceId=${id}`;

  return (
    <Box
      sx={styles.container}
      component={Link}
      target="_blank"
      rel="noopener noreferrer"
      href={navigateUrl}
    >
      <Stack spacing={0.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.937rem", sm: "1rem" },
            }}
          >
            {name}
          </Typography>

          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "0.937rem", sm: "1rem" },
            }}
          >
            {formatPrice(starting_offering.price_with_discount)} RON
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            icon={<AccessTimeOutlinedIcon />}
            label={`${starting_offering.duration} min`}
            sx={{
              "& .MuiChip-label": {
                fontSize: { xs: "0.75rem", sm: "0.8125rem" },
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            {filtersText}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BusinessProductCard;

const styles = {
  container: {
    display: "block",
    // Reducem p (padding) de la 2 (16px) la 1.5 (12px) pe mobile pentru a economisi spațiu spațial
    p: { xs: 1.5, sm: 2 },
    borderRadius: 5,
    mb: 1.5,
    bgcolor: "secondary.main",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    textDecoration: "none !important",
    color: "text.primary",

    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.secondary.dark, 0.4),
    },
  },
};
