import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ProductOfferingRow from "./ProductOfferingRow";
import {
  FieldArrayWithId,
  useFormContext,
  UseFormWatch,
} from "react-hook-form";
import { ProductFormValues } from "./AddProductModal";
import { find } from "lodash";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

type ProductVariantWithEmployeesProps = {
  employees: BusinessEmployee[];
  index: number;
  watch: UseFormWatch<ProductFormValues>;
  offeringFields: FieldArrayWithId<
    ProductFormValues,
    `variants.${number}.offerings`,
    "id"
  >[];
};

const ProductVariantWithEmployees = ({
  employees,
  index,
  watch,
  offeringFields,
}: ProductVariantWithEmployeesProps) => {
  const { setValue } = useFormContext();
  const [bulkPrice, setBulkPrice] = useState("");
  const [bulkDiscount, setBulkDiscount] = useState("");

  const handleApplyToAll = () => {
    offeringFields.forEach((_, empIndex) => {
      setValue(`variants.${index}.offerings.${empIndex}.is_offering`, true, {
        shouldDirty: true,
      });
      setValue(`variants.${index}.offerings.${empIndex}.price`, bulkPrice, {
        shouldDirty: true,
      });
      setValue(
        `variants.${index}.offerings.${empIndex}.discount`,
        bulkDiscount || "0",
        { shouldDirty: true }
      );
    });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography fontWeight="700" mb={2} color="primary">
        Prețuri per angajat
      </Typography>

      <Box sx={styles.bulkApplyBox}>
        <Typography fontWeight="600" mb={1.5}>
          Aplică același preț tuturor angajaților
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "flex-end" }}
        >
          <TextField
            label="Preț"
            type="number"
            size="small"
            value={bulkPrice}
            onChange={(e) => setBulkPrice(e.target.value)}
            sx={styles.bulkInput}
          />
          <TextField
            label="Discount %"
            type="number"
            size="small"
            value={bulkDiscount}
            onChange={(e) => setBulkDiscount(e.target.value)}
            sx={styles.bulkInput}
          />
          <Button
            variant="contained"
            disableElevation
            disabled={!bulkPrice}
            onClick={handleApplyToAll}
            size="small"
          >
            Aplică la toți angajații
          </Button>
        </Stack>
      </Box>

      <Stack spacing={1.5}>
        {offeringFields.map((field, empIndex) => {
          const employee = find(employees, { id: field.user_id });

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
                bgcolor: isOffering ? "background.default" : "action.hover",
                opacity: isOffering ? 1 : 0.6,
                transition: "all 0.2s",
              }}
            >
              <Avatar
                src={employee?.avatar ?? ""}
                sx={{ width: 40, height: 40 }}
              />
              <Box sx={{ minWidth: 180 }}>
                <Typography variant="h5" fontWeight="700">
                  {employee?.fullname}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {employee?.job}
                </Typography>
              </Box>

              <ProductOfferingRow
                index={index}
                empIndex={empIndex}
                isOffering={isOffering}
              />
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default ProductVariantWithEmployees;

const styles = {
  bulkApplyBox: {
    p: 2,
    mb: 2,
    borderRadius: 3,
    border: "1px dashed",
    borderColor: "divider",
    bgcolor: "background.paper",
  },
  bulkInput: {
    minWidth: 140,
    "& .MuiOutlinedInput-root": {
      bgcolor: "background.default",
    },
  },
};
