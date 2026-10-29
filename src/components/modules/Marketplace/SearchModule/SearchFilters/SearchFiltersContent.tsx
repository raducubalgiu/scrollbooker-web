import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import React from "react";
import { formatPrice } from "@/utils/formatPrice";
import { SearchSortEnum } from "@/ts/models/booking/business/search/BusinessMapCombined";
import { DEFAULT_MAX_PRICE } from "./useSearchFiltersState";

type SearchFiltersContentProps = {
  hasDiscount: boolean;
  maxPrice: number;
  sort: SearchSortEnum;
  onToggleDiscount: () => void;
  onPriceChange: (value: number) => void;
  onSortChange: (sort: SearchSortEnum) => void;
};

const SearchFiltersContent = ({
  hasDiscount,
  maxPrice,
  sort,
  onToggleDiscount,
  onPriceChange,
  onSortChange,
}: SearchFiltersContentProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={600}>
        Opțiuni
      </Typography>

      <Button
        variant="outlined"
        color={hasDiscount ? "primary" : "neutral"}
        size="large"
        sx={{ mt: 2.5 }}
        startIcon={<LocalOfferOutlinedIcon />}
        onClick={onToggleDiscount}
      >
        Oferte
      </Button>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={5}
        mb={2.5}
      >
        <Typography variant="h5" fontWeight={600}>
          Prețul maxim
        </Typography>

        <Typography variant="h5" fontWeight={600}>
          {formatPrice(maxPrice)} RON
        </Typography>
      </Stack>

      <Slider
        value={maxPrice}
        aria-label="Preț maxim"
        valueLabelDisplay="auto"
        min={0}
        max={DEFAULT_MAX_PRICE}
        onChange={(_, value) => onPriceChange(value as number)}
      />

      <Typography variant="h5" fontWeight={600} mt={5} mb={2.5}>
        Sortează după
      </Typography>

      {SearchSortEnum.all.map((s) => (
        <Button
          key={s.value}
          variant="outlined"
          color={s.value === sort ? "primary" : "neutral"}
          size="large"
          sx={{ mr: 1, mb: 1 }}
          onClick={() => onSortChange(s.value)}
        >
          {s.label}
        </Button>
      ))}
    </Box>
  );
};

export default SearchFiltersContent;
