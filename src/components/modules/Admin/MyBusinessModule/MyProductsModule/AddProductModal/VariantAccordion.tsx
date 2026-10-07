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
import { Control, UseFormWatch } from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import OptionFormFields from "./OptionFormFields";

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

  return (
    <Accordion defaultExpanded sx={styles.container}>
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
        <OptionFormFields
          index={index}
          control={control}
          watch={watch}
          employees={employees}
          hasEmployees={hasEmployees}
        />
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
