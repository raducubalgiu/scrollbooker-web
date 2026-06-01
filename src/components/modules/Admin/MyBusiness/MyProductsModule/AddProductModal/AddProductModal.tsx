import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddProductHeader from "./AddProductHeader";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductVariants from "./ProductVariants";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import {
  ProductFilterCreate,
  ProductWithFiltersCreate,
} from "@/ts/models/booking/product/Product";
import { useSession } from "next-auth/react";
import { FilterTypeEnum } from "@/ts/enums/FilterTypeEnum";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";

type AddProductModalProps = {
  open: boolean;
  handleClose: () => void;
  hasEmployees: boolean;
  employees: BusinessEmployee[];
  serviceDomainServices: SelectedServiceDomainWithServices[];
  isLoadingServices: boolean;
  isSavingProduct: boolean;
  onCreateProduct: (productCreate: ProductWithFiltersCreate) => void;
};

export interface FormProductFilter {
  filter_id: number;
  type: FilterTypeEnum;
  value: string | string[] | null;
  minim?: number | null;
  maxim?: number | null;
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
  type: string;
  serviceDomainId: string;
  serviceId: string;
  name: string;
  description: string | null;
  can_be_booked: boolean;
  variants: FormProductVariant[];
  filters: FormProductFilter[];
}

const getCleanDefaultValues = (
  employees: BusinessEmployee[]
): ProductFormValues => ({
  type: ProductTypeEnum.SINGLE,
  serviceDomainId: "",
  serviceId: "",
  name: "",
  description: "",
  can_be_booked: true,
  variants: [
    {
      name: "",
      duration: 0,
      offerings: employees.map((emp) => ({
        user_id: emp.id,
        price: 0,
        price_with_discount: 0,
        discount: 0,
        is_offering: true,
      })),
    },
  ],
  filters: [],
});

const AddProductModal = ({
  open,
  handleClose,
  hasEmployees,
  employees,
  serviceDomainServices,
  isLoadingServices,
  isSavingProduct,
  onCreateProduct,
}: AddProductModalProps) => {
  const { data: session } = useSession();

  const methods = useForm<ProductFormValues>({
    defaultValues: getCleanDefaultValues(employees),
  });

  const { control, handleSubmit, reset, watch } = methods;
  const selectedDomainId = watch("serviceDomainId");
  const watchFilters = watch("filters");

  useEffect(() => {
    if (open) {
      reset(getCleanDefaultValues(employees));
    }
  }, [open, employees, reset]);

  const onSubmit = (data: ProductFormValues) => {
    const filters: ProductFilterCreate[] =
      watchFilters?.flatMap((f) => {
        const value = f.value;

        if (!value) return [];

        const subFilterIds: number[] = (Array.isArray(value) ? value : [value])
          .map((val) => parseInt(val, 10))
          .filter((num) => !isNaN(num));

        if (subFilterIds.length === 0) return [];

        return [
          {
            filter_id: f.filter_id,
            sub_filter_ids: subFilterIds,
            type: f.type,
            minim: f.minim ?? null,
            maxim: f.maxim ?? null,
            is_not_applicable: false,
          },
        ];
      }) ?? [];

    const productCreate: ProductWithFiltersCreate = {
      product: {
        name: data.name.trim(),
        description: data.description ? data.description.trim() : null,
        service_domain_id: Number(data.serviceDomainId),
        service_id: Number(data.serviceId),
        business_id: Number(session?.business_id),
        currency_id: 1,
        can_be_booked: data.can_be_booked,
        type: data.type,

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
      },
      filters,
    };

    onCreateProduct(productCreate);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AddProductHeader
        onHandleClose={handleClose}
        onReset={() => reset()}
        isSavingProduct={isSavingProduct}
        onSaveProduct={handleSubmit(onSubmit)}
      />

      <FormProvider {...methods}>
        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
          <ProductGeneralInfo
            open={open}
            serviceDomainServices={serviceDomainServices}
            isLoadingServices={isLoadingServices}
            selectedDomainId={selectedDomainId}
          />
          <ProductVariants
            hasEmployees={hasEmployees}
            employees={employees}
            control={control}
            watch={watch}
          />
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddProductModal;
