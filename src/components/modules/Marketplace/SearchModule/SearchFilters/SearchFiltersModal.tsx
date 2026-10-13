import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { SearchSortEnum } from "@/ts/models/booking/business/search/BusinessMapCombined";
import SearchFiltersContent from "./SearchFiltersContent";
import { useSearchFiltersState, SearchFiltersResult } from "./useSearchFiltersState";

type SearchFiltersModalProps = {
  hasDiscount: boolean;
  maxPrice: number | null;
  open: boolean;
  sort: SearchSortEnum | null;
  onClose: () => void;
  onApplyFilters: (filters: SearchFiltersResult) => void;
};

export default function SearchFiltersModal({
  open,
  onClose,
  sort,
  hasDiscount,
  maxPrice,
  onApplyFilters,
}: SearchFiltersModalProps) {
  const {
    state,
    handleToggleDiscount,
    handlePriceChange,
    handleSortChange,
    isStateUnchanged,
    isAlreadyReset,
    handleReset,
    handleApply,
  } = useSearchFiltersState({ open, hasDiscount, maxPrice, sort, onApplyFilters });

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const actions: ActionButtonType[] = [
    {
      title: "Reset",
      props: {
        variant: "text",
        disabled: isAlreadyReset,
        sx: { py: 1.75, px: 3.5 },
        onClick: handleReset,
      },
    },
    {
      title: "Aplică",
      props: {
        disabled: isStateUnchanged,
        variant: "contained",
        sx: { py: 1.75, px: 3.5 },
        onClick: handleApply,
      },
    },
  ];

  if (!isDesktop) return null;

  return (
    <Modal
      title="Filtre"
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
    >
      <SearchFiltersContent
        hasDiscount={state.hasDiscount}
        maxPrice={state.maxPrice}
        sort={state.sort}
        onToggleDiscount={handleToggleDiscount}
        onPriceChange={handlePriceChange}
        onSortChange={handleSortChange}
      />
    </Modal>
  );
}
