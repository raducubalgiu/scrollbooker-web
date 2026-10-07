import Input from "@/components/core/Input/Input";
import { Alarm, DeleteOutline, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Box,
  IconButton,
  Stack,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { Control, useFieldArray, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import ProductVariantWithEmployees from "./ProductVariantWithEmployees";
import { required } from "@/utils/validation-rules";
import ProductOfferingRow from "./ProductOfferingRow";

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

  const { fields: offeringFields } = useFieldArray({
    control,
    name: `variants.${index}.offerings`,
  });

  return (
    <Accordion sx={styles.container}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        component="div"
        sx={styles.summary}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%", pr: 1 }}
        >
          <Stack flexDirection="row" alignItems="center" gap={1.5} minWidth={0}>
            <Box sx={styles.iconBadge}>
              <Alarm fontSize="small" />
            </Box>

            <Box minWidth={0}>
              <Typography fontWeight="700" noWrap>
                {variantName || `Opțiunea #${index + 1}`}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {variantDuration ? `${variantDuration} min` : "Fără durată setată"}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title="Șterge opțiunea">
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                remove();
              }}
              sx={styles.deleteButton}
            >
              <DeleteOutline fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          bgcolor: "background.default",
          p: 3,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
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
  summary: {
    py: 0.5,
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
      minWidth: 0,
    },
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
    color: "primary.main",
  },
  deleteButton: {
    "&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.08),
    },
  },
};
