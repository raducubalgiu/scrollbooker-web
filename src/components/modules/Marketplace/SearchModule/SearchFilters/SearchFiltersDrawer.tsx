import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { SearchSortEnum } from "@/ts/models/booking/business/search/BusinessMapCombined";
import SearchFiltersContent from "./SearchFiltersContent";
import { useSearchFiltersState, SearchFiltersResult } from "./useSearchFiltersState";
import MobileSheetActions from "../SearchHeader/mobile/MobileSheetActions";

type SearchFiltersDrawerProps = {
  open: boolean;
  hasDiscount: boolean;
  maxPrice: number | null;
  sort: SearchSortEnum | null;
  onClose: () => void;
  onApplyFilters: (filters: SearchFiltersResult) => void;
};

const SearchFiltersDrawer = ({
  open,
  hasDiscount,
  maxPrice,
  sort,
  onClose,
  onApplyFilters,
}: SearchFiltersDrawerProps) => {
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

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Typography variant="h6" fontWeight={700}>
          Filtre
        </Typography>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        <SearchFiltersContent
          hasDiscount={state.hasDiscount}
          maxPrice={state.maxPrice}
          sort={state.sort}
          onToggleDiscount={handleToggleDiscount}
          onPriceChange={handlePriceChange}
          onSortChange={handleSortChange}
        />
      </Box>

      <MobileSheetActions
        isClearEnabled={!isAlreadyReset}
        isConfirmEnabled={!isStateUnchanged}
        onClear={handleReset}
        onConfirm={handleApply}
        clearActionText="Reset"
        confirmActionText="Aplică"
      />
    </Drawer>
  );
};

export default SearchFiltersDrawer;

const styles = {
  paper: {
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  scrollArea: {
    px: 0.5,
    overflowY: "auto",
    flex: 1,
    minHeight: 0,
  },
};
