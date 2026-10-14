import { useMemo } from "react";
import { SelectedBookingItem } from "../../BookingModule";

export const useBookingCartTotals = (
  selectedItems: SelectedBookingItem[],
  selectedEmployeeId: number | null
) => {
  return useMemo(() => {
    let minTotal = 0;
    let fixedTotal = 0;
    let hasGlobalVariance = false;
    let totalDuration = 0;

    selectedItems?.forEach((item) => {
      const offerings = item.offerings || [];
      const prices = offerings.map((o) => Number(o.price_with_discount));

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (offerings.length > 1 && minPrice !== maxPrice) {
        hasGlobalVariance = true;
      }

      const currentOffering = offerings.find(
        (o) => o.user.id === selectedEmployeeId
      );

      minTotal += minPrice;
      fixedTotal += currentOffering
        ? Number(currentOffering.price_with_discount)
        : minPrice;
      totalDuration += item.variantDuration;
    });

    return {
      displayPrice: selectedEmployeeId ? fixedTotal : minTotal,
      showFromLabel: !selectedEmployeeId && hasGlobalVariance,
      totalDuration,
    };
  }, [selectedItems, selectedEmployeeId]);
};
