import Input from "@/components/core/Input/Input";
import { min, max, required } from "@/utils/validation-rules";
import { Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type ProductOfferingRowProps = {
  index: number;
  empIndex: number;
  isOffering: boolean;
};

const ProductOfferingRow = ({
  index,
  empIndex,
  isOffering,
}: ProductOfferingRowProps) => {
  const isRequired = required({ isNumber: true });

  const minDiscount = min(0);
  const maxDiscount = max(100);

  const { control, setValue } = useFormContext();

  const priceName = `variants.${index}.offerings.${empIndex}.price`;
  const discountName = `variants.${index}.offerings.${empIndex}.discount`;
  const finalPriceName = `variants.${index}.offerings.${empIndex}.price_with_discount`;

  const priceValue = useWatch({ control, name: priceName });
  const discountValue = useWatch({ control, name: discountName });

  const numericPrice = parseFloat(priceValue) || 0;
  const numericDiscount = parseFloat(discountValue) || 0;

  const safeDiscount = Math.min(Math.max(numericDiscount, 0), 100);

  const calculatedPriceWithDiscount =
    numericPrice - (numericPrice * safeDiscount) / 100;

  useEffect(() => {
    if (numericPrice > 0) {
      setValue(
        finalPriceName,
        parseFloat(calculatedPriceWithDiscount.toFixed(2)),
        {
          shouldValidate: true,
          shouldDirty: true,
        }
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
  ]);

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        flex: 1,
      }}
    >
      <Input
        size="small"
        name={`variants.${index}.offerings.${empIndex}.price`}
        label="Preț standard"
        type="number"
        rules={{ ...isRequired }}
        disabled={!isOffering}
      />
      <Input
        size="small"
        name={`variants.${index}.offerings.${empIndex}.discount`}
        label="Discount %"
        type="number"
        rules={{ ...minDiscount, ...maxDiscount }}
        disabled={!isOffering}
      />
      <Input
        size="small"
        name={finalPriceName}
        label="Preț final"
        type="number"
        disabled
      />

      <Button
        variant={isOffering ? "text" : "contained"}
        color={isOffering ? "error" : "primary"}
        size="small"
        sx={{
          textTransform: "none",
          fontWeight: "700",
          minWidth: 140,
        }}
        onClick={() => {
          setValue(
            `variants.${index}.offerings.${empIndex}.is_offering`,
            !isOffering
          );
        }}
      >
        {isOffering ? "Nu oferă" : "Activează"}
      </Button>
    </Stack>
  );
};

export default ProductOfferingRow;
