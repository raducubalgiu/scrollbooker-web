import Input from "@/components/core/Input/Input";
import { min, max, required } from "@/utils/validation-rules";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import OfferingToggle from "./OfferingToggle";

type ProductOfferingRowProps = {
  index: number;
  empIndex?: number;
  isOffering?: boolean;
  showActions?: boolean;
  inputSize?: "small" | "medium";
};

const ProductOfferingRow = ({
  index,
  empIndex = 0,
  isOffering = true,
  showActions = true,
  inputSize = "small",
}: ProductOfferingRowProps) => {
  const isRequired = required({ isNumber: true });

  const minDiscount = min(0);
  const maxDiscount = max(100);

  const { control, setValue, clearErrors } = useFormContext();

  const isFieldDisabled = showActions && !isOffering;

  const priceName = `variants.${index}.offerings.${empIndex}.price`;
  const discountName = `variants.${index}.offerings.${empIndex}.discount`;
  const finalPriceName = `variants.${index}.offerings.${empIndex}.price_with_discount`;
  const isOfferingName = `variants.${index}.offerings.${empIndex}.is_offering`;

  const priceValue = useWatch({ control, name: priceName });
  const discountValue = useWatch({ control, name: discountName });

  const numericPrice = parseFloat(priceValue) || 0;
  const numericDiscount = parseFloat(discountValue) || 0;
  const safeDiscount = Math.min(Math.max(numericDiscount, 0), 100);

  const calculatedPriceWithDiscount =
    numericPrice - (numericPrice * safeDiscount) / 100;

  useEffect(() => {
    if (showActions && !isOffering) {
      clearErrors([priceName, discountName, finalPriceName]);
      setValue(priceName, 0);
      setValue(discountName, 0);
      setValue(finalPriceName, 0);
    }
  }, [
    isOffering,
    showActions,
    priceName,
    discountName,
    finalPriceName,
    setValue,
    clearErrors,
  ]);

  useEffect(() => {
    if (showActions && !isOffering) return;

    if (numericPrice > 0) {
      setValue(
        finalPriceName,
        parseFloat(calculatedPriceWithDiscount.toFixed(2)),
        { shouldValidate: true, shouldDirty: true }
      );
    } else {
      setValue(finalPriceName, 0);
    }
  }, [
    numericPrice,
    safeDiscount,
    calculatedPriceWithDiscount,
    finalPriceName,
    setValue,
    isOffering,
    showActions,
  ]);

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{ flex: 1 }}
    >
      {isFieldDisabled ? (
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
          Nu oferă serviciul respectiv
        </Typography>
      ) : (
        <>
          <Input
            size={inputSize}
            name={priceName}
            label="Preț standard"
            type="number"
            rules={{ ...isRequired }}
          />
          <Input
            size={inputSize}
            name={discountName}
            label="Discount %"
            type="number"
            rules={{ ...minDiscount, ...maxDiscount }}
          />
          <Input
            size={inputSize}
            name={finalPriceName}
            label="Preț final"
            type="number"
            disabled
          />
        </>
      )}

      {showActions && (
        <OfferingToggle
          isOffering={isOffering}
          onToggle={() => setValue(isOfferingName, !isOffering)}
        />
      )}
    </Stack>
  );
};

export default ProductOfferingRow;
