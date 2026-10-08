"use client";

import React from "react";
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
import { FormProvider, UseFormWatch, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FormProductVariant, ProductFormValues } from "../AddProductModal/AddProductModal";
import OptionFormFields from "../AddProductModal/OptionFormFields";
import { buildDefaultOfferings } from "../AddProductModal/buildDefaultOfferings";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { Product, ProductVariantCreate } from "@/ts/models/booking/product/Product";
import {
  useCreateProductVariant,
  useUpdateProductVariant,
} from "@/controllers/booking/product.controller";

type EditOptionDrawerProps = {
  open: boolean;
  productId: number;
  index: number | null;
  existingVariantId: number | null;
  watch: UseFormWatch<ProductFormValues>;
  employees: BusinessEmployee[];
  hasEmployees: boolean;
  ownerUserId: number;
  onClose: () => void;
  onSaved: (product: Product) => void;
};

const buildBlankSeed = (
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

const EditOptionDrawer = ({
  open,
  productId,
  index,
  existingVariantId,
  watch,
  employees,
  hasEmployees,
  ownerUserId,
  onClose,
  onSaved,
}: EditOptionDrawerProps) => {
  const isNew = existingVariantId === null;

  const localMethods = useForm<ProductFormValues>({
    defaultValues:
      index !== null
        ? {
            serviceDomainId: "",
            serviceId: "",
            name: "",
            description: "",
            filters: [],
            variants: [watch(`variants.${index}`) as FormProductVariant],
          }
        : buildBlankSeed(hasEmployees, employees, ownerUserId),
  });
  const {
    control: localControl,
    watch: localWatch,
    getValues: localGetValues,
    trigger: localTrigger,
  } = localMethods;

  const { mutate: createVariant, isPending: isCreating } =
    useCreateProductVariant();
  const { mutate: updateVariant, isPending: isUpdating } =
    useUpdateProductVariant();

  const isSaving = isNew ? isCreating : isUpdating;

  const handleSave = async () => {
    const isValid = await localTrigger(["variants.0.name", "variants.0.duration"]);
    if (!isValid) {
      toast.error("Completează toate câmpurile obligatorii.");
      return;
    }

    const variant = localGetValues("variants.0");
    const activeOfferings = variant.offerings.filter((o) => o.is_offering);

    if (hasEmployees && activeOfferings.length === 0) {
      toast.error("Activează cel puțin un angajat pentru această opțiune.");
      return;
    }

    if (activeOfferings.some((o) => !(Number(o.price) > 0))) {
      toast.error("Completează un preț valid pentru fiecare angajat activ.");
      return;
    }

    const payload: ProductVariantCreate = {
      name: variant.name.trim(),
      duration: Number(variant.duration),
      offerings: variant.offerings
        .filter((o) => o.is_offering)
        .map((o) => ({
          user_id: Number(o.user_id),
          price: Number(o.price),
          discount: Number(o.discount),
          price_with_discount: Number(o.price_with_discount),
        })),
    };

    if (isNew) {
      createVariant(
        { productId, data: payload },
        {
          onSuccess: (freshProduct) => {
            toast.success("Opțiunea a fost adăugată.");
            onSaved(freshProduct);
          },
          onError: () => {
            toast.error("A apărut o eroare la adăugarea opțiunii.");
          },
        }
      );
      return;
    }

    updateVariant(
      { productId, variantId: existingVariantId, data: payload },
      {
        onSuccess: (freshProduct) => {
          toast.success("Opțiunea a fost actualizată.");
          onSaved(freshProduct);
        },
        onError: () => {
          toast.error("A apărut o eroare la salvarea opțiunii.");
        },
      }
    );
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
        <IconButton onClick={onClose} size="small" disabled={isSaving}>
          <CloseIcon />
        </IconButton>

        <Typography fontWeight={700}>Opțiune</Typography>

        <Box sx={{ width: 34 }} />
      </Stack>

      <Box sx={styles.content}>
        <FormProvider {...localMethods}>
          <OptionFormFields
            index={0}
            control={localControl}
            watch={localWatch}
            employees={employees}
            hasEmployees={hasEmployees}
          />
        </FormProvider>
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={isSaving}
          loading={isSaving}
          onClick={handleSave}
        >
          Salvează
        </Button>
      </Box>
    </Drawer>
  );
};

export default EditOptionDrawer;

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
