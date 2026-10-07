import Input from "@/components/core/Input/Input";
import { Box, Stack } from "@mui/material";
import React from "react";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ProductVariantWithEmployees from "./ProductVariantWithEmployees";
import { required } from "@/utils/validation-rules";
import ProductOfferingRow from "./ProductOfferingRow";

type OptionFormFieldsProps = {
  index: number;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  employees: BusinessEmployee[];
  hasEmployees: boolean;
};

const OptionFormFields = ({
  index,
  control,
  watch,
  employees,
  hasEmployees,
}: OptionFormFieldsProps) => {
  const { fields: offeringFields } = useFieldArray({
    control,
    name: `variants.${index}.offerings`,
  });

  return (
    <>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="flex-start"
        sx={{
          mb: hasEmployees ? 4 : 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            md: 320,
            maxWidth: { md: 400 },
          }}
        >
          <Input
            name={`variants.${index}.name`}
            label="Nume Opțiune"
            placeholder="ex: Masaj de relaxare"
            rules={required()}
          />
        </Box>

        <Box sx={{ width: { xs: "100%", md: 300 } }}>
          <Input
            name={`variants.${index}.duration`}
            label="Durată (min)"
            type="number"
            rules={required({ isNumber: true })}
          />
        </Box>

        {!hasEmployees && (
          <Box sx={{ width: "100%", flexGrow: 1 }}>
            <ProductOfferingRow
              index={index}
              showActions={false}
              inputSize="medium"
            />
          </Box>
        )}
      </Stack>

      {hasEmployees && (
        <ProductVariantWithEmployees
          employees={employees}
          index={index}
          watch={watch}
          offeringFields={offeringFields}
        />
      )}
    </>
  );
};

export default OptionFormFields;
