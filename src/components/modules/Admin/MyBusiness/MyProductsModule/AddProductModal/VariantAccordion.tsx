import Input from "@/components/core/Input/Input";
import { Alarm, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type VariantAccordionProps = {
  index: number;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  hasEmployees: boolean;
  remove: () => void;
};

const VariantAccordion = ({
  index,
  control,
  watch,
  hasEmployees,
  remove,
}: VariantAccordionProps) => {
  const variantName = watch(`variants.${index}.name`);
  const variantDuration = watch(`variants.${index}.duration`);

  const { fields: offeringFields } = useFieldArray({
    control,
    name: `variants.${index}.offerings`,
  });

  return (
    <Accordion
      sx={{
        borderRadius: "12px !important",
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        "&:before": { display: "none" },
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
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
          <Grid size={{ xs: 12, sm: hasEmployees ? 8 : 6 }}>
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
                  name={`variants.${index}.starting_price`}
                  label="Preț"
                  type="number"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 2 }}>
                <Input
                  name={`variants.${index}.starting_price_with_discount`}
                  label="Preț Discount"
                  type="number"
                />
              </Grid>
            </>
          )}
        </Grid>

        {hasEmployees && (
          <Box sx={{ mt: 2 }}>
            <Typography fontWeight="700" mb={2} color="primary">
              Prețuri per angajat
            </Typography>

            <Stack spacing={1.5}>
              {offeringFields.map((field, empIndex) => {
                // 1. Monitorizăm valorile pentru a calcula prețul cu discount în timp real
                const currentPrice =
                  watch(`variants.${index}.offerings.${empIndex}.price`) || 0;
                const currentDiscount =
                  watch(`variants.${index}.offerings.${empIndex}.discount`) ||
                  0;

                // 2. Calculăm prețul final
                const priceWithDiscount =
                  currentPrice - (currentPrice * currentDiscount) / 100;

                // 3. Monitorizăm dacă angajatul oferă serviciul
                const isOffering = watch(
                  `variants.${index}.offerings.${empIndex}.is_offering`
                );

                return (
                  <Paper
                    variant="outlined"
                    key={field.id}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      bgcolor: isOffering ? "background.paper" : "action.hover",
                      opacity: isOffering ? 1 : 0.6,
                      transition: "all 0.2s",
                    }}
                  >
                    <Avatar
                      src={field.avatar ?? ""}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box sx={{ minWidth: 180 }}>
                      <Typography variant="subtitle2" fontWeight="700">
                        {field.fullname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {field.profession}
                      </Typography>
                    </Box>

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{
                        flex: 1,
                        visibility: isOffering ? "visible" : "hidden",
                      }}
                    >
                      <Input
                        size="small"
                        name={`variants.${index}.offerings.${empIndex}.price`}
                        label="Preț standard"
                        type="number"
                      />
                      <Input
                        size="small"
                        name={`variants.${index}.offerings.${empIndex}.discount`} // Corectat din 'price' în 'discount'
                        label="Discount %"
                        type="number"
                      />
                      {/* Folosim value manual pentru prețul calculat, deoarece e disabled */}
                      <Input
                        size="small"
                        name={`variants.${index}.offerings.${empIndex}.price_with_discount`}
                        label="Preț final"
                        type="number"
                        disabled
                        value={
                          priceWithDiscount > 0
                            ? priceWithDiscount.toFixed(2)
                            : ""
                        }
                      />
                    </Stack>

                    <Button
                      variant={isOffering ? "text" : "contained"}
                      color={isOffering ? "error" : "primary"}
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontWeight: "700",
                        minWidth: 140,
                      }}
                      // Aici va trebui să implementezi logica de toggle pentru is_offering
                      onClick={() => {
                        // setValue(`variants.${index}.offerings.${empIndex}.is_offering`, !isOffering)
                      }}
                    >
                      {isOffering ? "Nu oferă" : "Activează"}
                    </Button>
                  </Paper>
                );
              })}
            </Stack>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default VariantAccordion;
