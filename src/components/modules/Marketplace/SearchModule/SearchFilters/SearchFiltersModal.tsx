import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import React, { useState, useEffect } from "react";
import { formatPrice } from "@/utils/formatPrice";

type SearchFiltersModalProps = {
  hasDiscount: boolean;
  maxPrice: number | null;
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    hasDiscount: boolean;
    maxPrice: number | null;
  }) => void;
};

const DEFAULT_MAX_PRICE = 5000;

export default function SearchFiltersModal({
  open,
  onClose,
  hasDiscount,
  maxPrice,
  onApplyFilters,
}: SearchFiltersModalProps) {
  const [state, setState] = useState(() => ({
    hasDiscount,
    maxPrice: maxPrice ?? DEFAULT_MAX_PRICE,
  }));

  useEffect(() => {
    if (open) {
      setState({
        hasDiscount,
        maxPrice: maxPrice ?? DEFAULT_MAX_PRICE,
      });
    }
  }, [open, hasDiscount, maxPrice]);

  const handleDiscountToggle = () => {
    setState((prev) => ({ ...prev, hasDiscount: !prev.hasDiscount }));
  };

  const handlePriceChange = (_: Event, value: number | number[]) => {
    setState((prev) => ({ ...prev, maxPrice: value as number }));
  };

  const isStateUnchanged =
    state.hasDiscount === hasDiscount &&
    state.maxPrice === (maxPrice ?? DEFAULT_MAX_PRICE);

  const isAlreadyReset =
    state.hasDiscount === false && state.maxPrice === DEFAULT_MAX_PRICE;

  const actions: ActionButtonType[] = [
    {
      title: "Reset",
      props: {
        variant: "text",
        disabled: isAlreadyReset,
        sx: {
          py: 1.75,
          px: 3.5,
        },
        onClick: () => {
          setState({
            hasDiscount: false,
            maxPrice: DEFAULT_MAX_PRICE,
          });
        },
      },
    },
    {
      title: "Aplică",
      props: {
        disabled: isStateUnchanged,
        variant: "contained",
        sx: {
          py: 1.75,
          px: 3.5,
        },
        onClick: () => onApplyFilters?.(state),
      },
    },
  ];

  return (
    <Modal
      title="Filtre"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          Opțiuni
        </Typography>

        <Button
          variant={state.hasDiscount ? "contained" : "outlined"}
          color={state.hasDiscount ? "primary" : "inherit"}
          size="large"
          sx={{ mt: 2.5 }}
          startIcon={<LocalOfferOutlinedIcon />}
          onClick={handleDiscountToggle}
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
            {formatPrice(state.maxPrice)} RON
          </Typography>
        </Stack>

        <Slider
          value={state.maxPrice}
          aria-label="Preț maxim"
          valueLabelDisplay="auto"
          min={0}
          max={DEFAULT_MAX_PRICE}
          onChange={handlePriceChange}
        />

        <Typography variant="h5" fontWeight={600} mt={5}>
          Sortează după
        </Typography>
      </Box>
    </Modal>
  );
}
