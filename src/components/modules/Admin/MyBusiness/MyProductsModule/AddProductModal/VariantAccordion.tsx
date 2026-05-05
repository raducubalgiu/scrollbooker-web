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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Alarm color="primary" fontSize="small" />
          <Typography fontWeight="700">Varianta #1</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto", mr: 2 }}
          >
            30 min
          </Typography>
        </Box>
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
            <Typography
              variant="subtitle2"
              fontWeight="700"
              mb={2}
              color="primary"
            >
              Configurare prețuri per angajat
            </Typography>

            <Stack spacing={1.5}>
              {offeringFields.map((field, empIndex) => {
                // Aici isOffering ar putea fi controlat de un switch/checkbox din formular
                const isOffering = true;

                return (
                  <Paper
                    variant="outlined"
                    key={field.id} // Folosim field.id de la useFieldArray
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      bgcolor: isOffering ? "background.paper" : "action.hover",
                      opacity: isOffering ? 1 : 0.7,
                    }}
                  >
                    <Avatar sx={{ width: 40, height: 40 }} />
                    <Box sx={{ minWidth: 180 }}>
                      <Typography variant="subtitle2" fontWeight="700">
                        Nume Angajat
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Expert
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={2} sx={{ flex: 1 }}>
                      <Input
                        size="small"
                        name={`variants.${index}.offerings.${empIndex}.price`}
                        label="Preț standard"
                      />
                      <Input
                        size="small"
                        name={`variants.${index}.offerings.${empIndex}.price_with_discount`}
                        label="Preț cu discount"
                      />
                    </Stack>

                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      sx={{ textTransform: "none" }}
                    >
                      Nu oferă
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
