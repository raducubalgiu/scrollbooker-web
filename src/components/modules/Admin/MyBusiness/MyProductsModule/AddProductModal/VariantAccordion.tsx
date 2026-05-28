import Input from "@/components/core/Input/Input";
import { Alarm, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ProductVariantsWithEmployees from "./ProductVariantWithEmployees";

type VariantAccordionProps = {
  index: number;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  employees: BusinessEmployee[];
  hasEmployees: boolean;
  remove: () => void;
};

const VariantAccordion = ({
  index,
  control,
  watch,
  employees,
  hasEmployees,
  remove,
}: VariantAccordionProps) => {
  const variantName = watch(`variants.${index}.name`);
  const variantDuration = watch(`variants.${index}.duration`);

  console.log("REMOVE!!!", remove);

  const { fields: offeringFields } = useFieldArray({
    control,
    name: `variants.${index}.offerings`,
  });

  return (
    <Accordion sx={styles.container}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Stack
          flexDirection="row"
          alignItems="center"
          gap={2}
          sx={{ width: "100%" }}
        >
          <Alarm color="primary" fontSize="medium" />
          <Typography fontWeight="700">
            {variantName || `Varianta #${index + 1}`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto", mr: 2 }}
          >
            {variantDuration ? `${variantDuration} min` : "-- min"}
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Grid container spacing={3} sx={{ mb: hasEmployees ? 4 : 0 }}>
          <Grid size={{ xs: 12, sm: hasEmployees ? 8 : 4 }}>
            <Input
              name={`variants.${index}.name`}
              label="Nume Variantă"
              placeholder="ex: Masaj de relaxare"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: hasEmployees ? 4 : 2 }}>
            <Input
              name={`variants.${index}.duration`}
              label="Durată (min)"
              type="number"
            />
          </Grid>

          {!hasEmployees && (
            <>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Input
                  name={`variants.${index}.offerings.0.price`}
                  label="Preț"
                  type="number"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Input
                  name={`variants.${index}.offerings.0.discount`}
                  label="Discount"
                  type="number"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Input
                  name={`variants.${index}.offerings.0.price_with_discount`}
                  label="Preț final"
                  type="number"
                />
              </Grid>
            </>
          )}
        </Grid>

        {hasEmployees && (
          <ProductVariantsWithEmployees
            employees={employees}
            index={index}
            watch={watch}
            offeringFields={offeringFields}
          />
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default VariantAccordion;

const styles = {
  container: {
    borderRadius: "12px !important",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    "&:before": { display: "none" },
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
};
