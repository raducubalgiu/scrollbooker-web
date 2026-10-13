import { useEffect, useState } from "react";
import { SearchSortEnum } from "@/ts/models/booking/business/search/BusinessMapCombined";

export const DEFAULT_MAX_PRICE = 5000;

export type SearchFiltersValues = {
  hasDiscount: boolean;
  maxPrice: number;
  sort: SearchSortEnum;
};

export type SearchFiltersResult = {
  hasDiscount: boolean;
  maxPrice: number | null;
  sort: SearchSortEnum | null;
};

type UseSearchFiltersStateParams = {
  open: boolean;
  hasDiscount: boolean;
  maxPrice: number | null;
  sort: SearchSortEnum | null;
  onApplyFilters: (filters: SearchFiltersResult) => void;
};

const toValues = (
  hasDiscount: boolean,
  maxPrice: number | null,
  sort: SearchSortEnum | null
): SearchFiltersValues => ({
  hasDiscount,
  maxPrice: maxPrice ?? DEFAULT_MAX_PRICE,
  sort: sort ?? SearchSortEnum.RECOMMENDED,
});

export const useSearchFiltersState = ({
  open,
  hasDiscount,
  maxPrice,
  sort,
  onApplyFilters,
}: UseSearchFiltersStateParams) => {
  const [state, setState] = useState<SearchFiltersValues>(() =>
    toValues(hasDiscount, maxPrice, sort)
  );

  useEffect(() => {
    if (open) setState(toValues(hasDiscount, maxPrice, sort));
  }, [open, hasDiscount, maxPrice, sort]);

  const handleToggleDiscount = () => {
    setState((prev) => ({ ...prev, hasDiscount: !prev.hasDiscount }));
  };

  const handlePriceChange = (value: number) => {
    setState((prev) => ({ ...prev, maxPrice: value }));
  };

  const handleSortChange = (nextSort: SearchSortEnum) => {
    setState((prev) => ({ ...prev, sort: nextSort }));
  };

  const isStateUnchanged =
    state.hasDiscount === hasDiscount &&
    state.maxPrice === (maxPrice ?? DEFAULT_MAX_PRICE) &&
    state.sort === (sort ?? SearchSortEnum.RECOMMENDED);

  const isAlreadyReset =
    state.hasDiscount === false &&
    state.maxPrice === DEFAULT_MAX_PRICE &&
    state.sort === SearchSortEnum.RECOMMENDED;

  const handleReset = () => {
    setState({
      hasDiscount: false,
      maxPrice: DEFAULT_MAX_PRICE,
      sort: SearchSortEnum.RECOMMENDED,
    });
  };

  const handleApply = () => {
    onApplyFilters(state);
  };

  return {
    state,
    handleToggleDiscount,
    handlePriceChange,
    handleSortChange,
    isStateUnchanged,
    isAlreadyReset,
    handleReset,
    handleApply,
  };
};
