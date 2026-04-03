import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Box, Button, Slider, Stack, Typography } from "@mui/material";
import PercentIcon from "@mui/icons-material/Percent";
import React, { useState } from "react";

type FiltersModalProps = {
  hasDiscount: boolean;
  maxPrice: number;
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: { hasDiscount: boolean; maxPrice: number }) => void;
};

export default function FiltersModal({
  open,
  onClose,
  hasDiscount,
  maxPrice,
  onApplyFilters,
}: FiltersModalProps) {
  const [state, setState] = useState(() => ({
    hasDiscount,
    maxPrice,
  }));

  const actions: ActionButtonType[] = [
    {
      title: "Aplică",
      props: {
        onClick: () => {
          onApplyFilters?.(state);
        },
      },
    },
  ];

  const handleDiscountToggle = () => {
    setState((prev) => ({ ...prev, hasDiscount: !prev.hasDiscount }));
  };

  const handlePriceChange = (_: Event, value: number | number[]) => {
    setState((prev) => ({ ...prev, maxPrice: value as number }));
  };

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
        <Typography variant="h6" fontWeight={600}>
          Optiuni
        </Typography>

        <Button
          variant="outlined"
          color={state.hasDiscount ? "primary" : "secondary"}
          size="large"
          sx={{ mt: 2.5 }}
          startIcon={<PercentIcon />}
          onClick={handleDiscountToggle}
        >
          Reducere
        </Button>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={5}
          mb={2.5}
        >
          <Typography variant="h6" fontWeight={600}>
            Pretul maxim
          </Typography>

          <Typography variant="h6" fontWeight={600}>
            1500 RON
          </Typography>
        </Stack>

        <Slider
          value={state.maxPrice}
          aria-label="Small"
          valueLabelDisplay="auto"
          max={1500}
          onChange={handlePriceChange}
        />

        <Typography variant="h6" fontWeight={600} mt={5}>
          Sorteaza dupa
        </Typography>
      </Box>
    </Modal>
  );
}
