"use client";

import React from "react";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FormProvider, useForm } from "react-hook-form";
import { Session } from "next-auth";
import { toast } from "react-toastify";
import AddProductHeader from "../AddProductModal/AddProductHeader";
import ProductGeneralInfo from "../AddProductModal/ProductGeneralInfo";
import { ProductFormValues } from "../AddProductModal/AddProductModal";
import EditProductVariants from "./EditProductVariants";
import { buildEditBaseInfoValues } from "./buildEditBaseInfoValues";
import { useGetAllEmployeesByOwner } from "@/controllers/booking/employee.controller";
import { useGetMySelectedServices } from "@/controllers/nomenclature/service.controller";
import { useUpdateProductBaseInfo } from "@/controllers/booking/product.controller";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import {
  Product,
  ProductBaseInfoUpdate,
  ProductFilterCreate,
} from "@/ts/models/booking/product/Product";

type EditProductModalProps = {
  session: Session;
  open: boolean;
  product: Product;
  handleClose: () => void;
};

const EditProductModal = ({
  session,
  open,
  product,
  handleClose,
}: EditProductModalProps) => {
  const hasEmployees = session?.has_employees ?? false;

  const { data: serviceDomainServices } = useGetMySelectedServices({
    businessId: String(session?.business_id ?? ""),
  });

  const ownerUserId = session?.business_owner_id ?? 0;

  const { data: employees } = useGetAllEmployeesByOwner({
    businessOwnerId: ownerUserId,
    isEnabled: hasEmployees,
  });

  const { mutate: updateBaseInfo, isPending: isSavingBaseInfo } =
    useUpdateProductBaseInfo();

  const methods = useForm<ProductFormValues>({
    defaultValues: buildEditBaseInfoValues(product),
  });

  const { handleSubmit, reset, watch } = methods;
  const selectedDomainId = watch("serviceDomainId");

  const onSubmit = (data: ProductFormValues) => {
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

    const baseInfoUpdate: ProductBaseInfoUpdate = {
      name: data.name.trim(),
      description: data.description ? data.description.trim() : null,
      service_domain_id: Number(data.serviceDomainId),
      service_id: Number(data.serviceId),
      can_be_booked: product.can_be_booked,
      type: product.type || ProductTypeEnum.SINGLE,
      sessions_count: product.sessions_count ?? null,
      validity_days: product.validity_days ?? null,
      filters,
    };

    updateBaseInfo(
      { productId: product.id, data: baseInfoUpdate },
      {
        onSuccess: () => {
          toast.success("Informațiile serviciului au fost actualizate.");
        },
        onError: () => {
          toast.error("A apărut o eroare la salvarea informațiilor.");
        },
      }
    );
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        <AddProductHeader
          title="Editează serviciu"
          desktopSaveLabel="Salvează Modificările"
          mobileSaveLabel="Salvează Modificările"
          onHandleClose={handleClose}
          onReset={() => reset(buildEditBaseInfoValues(product))}
          isSavingProduct={isSavingBaseInfo}
          onSaveProduct={handleSubmit(onSubmit)}
        />

        <Grid
          container
          sx={{
            height: { xs: "auto", md: "100vh" },
            overflow: { xs: "auto", md: "hidden" },
          }}
        >
          <ProductGeneralInfo
            serviceDomainServices={serviceDomainServices || []}
            selectedDomainId={selectedDomainId}
          />
          <EditProductVariants
            product={product}
            hasEmployees={hasEmployees}
            employees={employees || []}
            ownerUserId={ownerUserId}
          />
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default EditProductModal;
