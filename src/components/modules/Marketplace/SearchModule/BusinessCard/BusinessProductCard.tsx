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
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {name}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {formatPrice(starting_offering.price_with_discount)} RON
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Chip
            size="small"
            icon={<AccessTimeOutlinedIcon />}
            label={`${starting_offering.duration} min`}
          />
          <Typography variant="body2" color="text.secondary">
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
    display: "block", // IMPORTANT: Transformă tag-ul <a> într-un element de tip block
    p: 2,
    borderRadius: 5,
    mb: 1.5,
    bgcolor: "secondary.main",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    textDecoration: "none !important", // Forțează eliminarea sublinierii textului în unele browsere
    color: "text.primary", // Folosește culoarea principală a textului din tema MUI în loc de albastrul nativ link-urilor

    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.secondary.dark, 0.4),
    },
  },
};
