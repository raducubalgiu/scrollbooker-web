"use client";

import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Theme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Control, FormProvider, UseFormWatch, useForm } from "react-hook-form";
import { FormProductVariant, ProductFormValues } from "./AddProductModal";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import OptionFormFields from "./OptionFormFields";
import { buildDefaultOfferings } from "./buildDefaultOfferings";

type OptionDrawerProps = {
  open: boolean;
  index: number | null;
  control: Control<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  employees: BusinessEmployee[];
  hasEmployees: boolean;
  ownerUserId: number;
  onClose: () => void;
  onCreate: (variant: FormProductVariant) => void;
};

const buildSeedValues = (
  hasEmployees: boolean,
  employees: BusinessEmployee[],
  ownerUserId: number
): ProductFormValues => ({
  serviceDomainId: "",
  serviceId: "",
  name: "",
  description: "",
  filters: [],
  variants: [
    {
      name: "",
      duration: 0,
      offerings: buildDefaultOfferings(hasEmployees, employees, ownerUserId),
    },
  ],
});

const OptionDrawer = ({
  open,
  index,
  control,
  watch,
  employees,
  hasEmployees,
  ownerUserId,
  onClose,
  onCreate,
}: OptionDrawerProps) => {
  const isCreating = index === null;

  const localMethods = useForm<ProductFormValues>({
    defaultValues: buildSeedValues(hasEmployees, employees, ownerUserId),
  });
  const {
    control: localControl,
    watch: localWatch,
    getValues: localGetValues,
    reset: localReset,
    trigger: localTrigger,
  } = localMethods;

  useEffect(() => {
    if (open && isCreating) {
      localReset(buildSeedValues(hasEmployees, employees, ownerUserId));
    }
  }, [open, isCreating, hasEmployees, employees, ownerUserId, localReset]);

  const handleSave = async () => {
    if (isCreating) {
      const isValid = await localTrigger("variants.0");
      if (!isValid) return;

      onCreate(localGetValues("variants.0"));
    }

    onClose();
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2, pb: 1.5 }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Opțiune</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>
        {index === null ? (
          <FormProvider {...localMethods}>
            <OptionFormFields
              index={0}
              control={localControl}
              watch={localWatch}
              employees={employees}
              hasEmployees={hasEmployees}
            />
          </FormProvider>
        ) : (
          <OptionFormFields
            index={index}
            control={control}
            watch={watch}
            employees={employees}
            hasEmployees={hasEmployees}
          />
        )}
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          onClick={handleSave}
        >
          Salvează
        </Button>
      </Box>
    </Drawer>
  );
};

export default OptionDrawer;

const styles = {
  drawer: {
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
  paper: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    p: 2,
    pt: 0,
    overflowY: "auto",
  },
};
