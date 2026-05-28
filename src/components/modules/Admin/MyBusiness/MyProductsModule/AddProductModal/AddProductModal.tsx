import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddProductHeader from "./AddProductHeader";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductVariants from "./ProductVariants";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";
import { ProductWithFiltersCreate } from "@/ts/models/booking/product/Product";

type AddProductModalProps = {
  open: boolean;
  handleClose: () => void;
  hasEmployees: boolean;
  employees: BusinessEmployee[];
};

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
}

const AddProductModal = ({
  open,
  handleClose,
  hasEmployees,
  employees,
}: AddProductModalProps) => {
  const methods = useForm<ProductFormValues>({
    defaultValues: {
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
    },
  });

  const { control, handleSubmit, reset, watch } = methods;
  const selectedDomainId = watch("serviceDomainId");

  const onSubmit = (data: ProductFormValues) => {
    const productCreate: ProductWithFiltersCreate = {
      product: {
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
      service_domain_id: Number(data.serviceDomainId),
      filters: [],
    };

    console.log("Payload mapat curat:", productCreate);
    // handleSave(productCreate);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AddProductHeader
        onHandleClose={handleClose}
        onReset={() => reset()}
        onSaveProduct={handleSubmit(onSubmit)}
      />

      <FormProvider {...methods}>
        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
          <ProductGeneralInfo open={open} selectedDomainId={selectedDomainId} />
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
