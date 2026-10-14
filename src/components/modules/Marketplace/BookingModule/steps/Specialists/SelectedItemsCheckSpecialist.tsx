import React, { useMemo } from "react";
import { alpha, Box, useTheme } from "@mui/material";
import { SelectedBookingItem } from "../../BookingModule";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";
import SelectedItemHeader from "./SelectedItemHeader";
import SelectedItemStatusRow from "./SelectedItemStatusRow";
import SelectedItemPriceVariance from "./SelectedItemPriceVariance";

type SelectedItemsCheckSpecialistProps = {
  item: SelectedBookingItem;
  eligibleEmployees: BookingFlowUser[];
  selectedEmployeeId: number | null;
  onRemoveItem: (item: SelectedBookingItem) => void;
};

const SelectedItemsCheckSpecialist = ({
  item,
  eligibleEmployees,
  selectedEmployeeId,
  onRemoveItem,
}: SelectedItemsCheckSpecialistProps) => {
  const theme = useTheme();

  const currentOffering = item.offerings.find(
    (o) => o.user.id === selectedEmployeeId
  );
  const hasOffering = !!currentOffering;

  const hasPriceVariance = useMemo(() => {
    const prices = item.offerings.map((o) => o.price_with_discount);
    return item.offerings.length > 1 && new Set(prices).size > 1;
  }, [item.offerings]);

  return (
    <Box
      sx={{
        p: { xs: 1.5, md: 3 },
        mb: { xs: 1, md: 2.5 },
        borderRadius: 4,
        border: 1.5,
        borderColor: hasOffering ? "divider" : "error.light",
        bgcolor: hasOffering
          ? "transparent"
          : alpha(theme.palette.error.main, 0.02),
      }}
    >
      <SelectedItemHeader
        productName={item.productName}
        variantName={item.variantName}
        variantDuration={item.variantDuration}
        hasOffering={hasOffering}
        price={currentOffering?.price_with_discount}
      />

      <SelectedItemStatusRow
        hasOffering={hasOffering}
        onRemove={() => onRemoveItem(item)}
      />

      {hasPriceVariance && (
        <SelectedItemPriceVariance
          item={item}
          eligibleEmployees={eligibleEmployees}
          selectedEmployeeId={selectedEmployeeId}
        />
      )}
    </Box>
  );
};

export default SelectedItemsCheckSpecialist;
