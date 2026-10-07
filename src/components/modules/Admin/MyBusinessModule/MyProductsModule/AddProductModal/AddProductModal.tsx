"use client";

import React, { useEffect } from "react";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormProvider, useForm } from "react-hook-form";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import AddProductHeader from "./AddProductHeader";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductVariants from "./ProductVariants";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import { useGetMySelectedServices } from "@/controllers/nomenclature/service.controller";
import { useCreateProduct } from "@/controllers/booking/product.controller";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import {
  ProductCreate,
  ProductFilterCreate,
} from "@/ts/models/booking/product/Product";

type AddProductModalProps = {
  session: Session;
  open: boolean;
  handleClose: () => void;
};

export interface FormProductFilter {
  filter_id: number;
  value: string | string[] | null;
}

export interface FormProductOffering {
  user_id: number;
  price: number;
  price_with_discount: number;
  discount: number;
  is_offering: boolean;
}

export interface FormProductVariant {
  name: string;
  duration: number;
  offerings: FormProductOffering[];
}

export interface ProductFormValues {
  serviceDomainId: string;
  serviceId: string;
  name: string;
  description: string | null;
  variants: FormProductVariant[];
  filters: FormProductFilter[];
}

const getCleanDefaultValues = (): ProductFormValues => ({
  serviceDomainId: "",
  serviceId: "",
  name: "",
  description: "",
  variants: [],
  filters: [],
});

const AddProductModal = ({
  session,
  open,
  handleClose,
}: AddProductModalProps) => {
  const hasEmployees = session?.has_employees ?? false;

  const { data: serviceDomainServices } = useGetMySelectedServices({
    businessId: String(session?.business_id ?? ""),
  });

  const { data: employees } = useGetAllEmployeesByOwner({
    businessOwnerId: session?.business_owner_id ?? 0,
    isEnabled: hasEmployees,
  });

  const { mutate: createProduct, isPending: isSavingProduct } =
    useCreateProduct();

  const methods = useForm<ProductFormValues>({
    defaultValues: getCleanDefaultValues(),
  });

  const { control, handleSubmit, reset, watch } = methods;
  const selectedDomainId = watch("serviceDomainId");

  useEffect(() => {
    if (open) {
      reset(getCleanDefaultValues());
    }
  }, [open, reset]);

  const handleResetAndClose = () => {
    reset(getCleanDefaultValues());
    handleClose();
  };

  const onSubmit = (data: ProductFormValues) => {
    if (!session?.business_id) return;

    const filters: ProductFilterCreate[] = data.filters.flatMap((f) => {
      const value = f.value;
      if (!value) return [];

      const subFilterIds = (Array.isArray(value) ? value : [value])
        .map((val) => parseInt(val, 10))
        .filter((num) => !isNaN(num));

      if (subFilterIds.length === 0) return [];

      return [
        {
          filter_id: f.filter_id,
          sub_filter_ids: subFilterIds,
          is_not_applicable: false,
        },
      ];
    });

    const productCreate: ProductCreate = {
      name: data.name.trim(),
      description: data.description ? data.description.trim() : null,
      service_domain_id: Number(data.serviceDomainId),
      service_id: Number(data.serviceId),
      business_id: Number(session.business_id),
      currency_id: 1,
      can_be_booked: true,
      type: ProductTypeEnum.SINGLE,
      variants: data.variants.map((v) => ({
        name: v.name.trim(),
        duration: Number(v.duration),
        offerings: v.offerings
          .filter((o) => o.is_offering)
          .map((o) => ({
            user_id: Number(o.user_id),
            price: Number(o.price),
            discount: Number(o.discount),
            price_with_discount: Number(o.price_with_discount),
          })),
      })),
    };

    createProduct(
      { product: productCreate, filters },
      {
        onSuccess: () => {
          toast.success("Serviciul a fost creat cu succes!");
          handleResetAndClose();
        },
        onError: () => {
          toast.error("A apărut o eroare la crearea serviciului.");
        },
      }
    );
  };

  return (
    <Dialog fullScreen open={open} onClose={handleResetAndClose}>
      <FormProvider {...methods}>
        <AddProductHeader
          onHandleClose={handleResetAndClose}
          onReset={() => reset(getCleanDefaultValues())}
          isSavingProduct={isSavingProduct}
          onSaveProduct={handleSubmit(onSubmit)}
        />

        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
          <ProductGeneralInfo
            serviceDomainServices={serviceDomainServices || []}
            selectedDomainId={selectedDomainId}
          />
          <ProductVariants
            hasEmployees={hasEmployees}
            employees={employees || []}
            control={control}
            watch={watch}
          />
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddProductModal;
