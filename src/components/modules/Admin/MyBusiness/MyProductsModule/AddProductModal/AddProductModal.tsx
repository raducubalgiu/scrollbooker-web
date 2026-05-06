import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddProductHeader from "./AddProductHeader";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductVariants from "./ProductVariants";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { ProductTypeEnum } from "@/ts/enums/ProductTypeEnum";

type AddProductModalProps = {
  open: boolean;
  handleClose: () => void;
  hasEmployees: boolean;
  employees: BusinessEmployee[];
};

export interface ProductFormValues {
  type: string;
  serviceDomainId: string;
  serviceId: string;
  name: string;
  description: string | null;
  can_be_booked: boolean;
  variants: {
    name: string;
    duration: number;
    has_different_prices: boolean;
    starting_price?: number;
    starting_price_with_discount?: number;
    offerings: {
      user_id: number;
      fullname: string;
      username: string;
      profession: string;
      avatar: string | null;
      price: number;
      price_with_discount: number;
      discount: number;
      is_offering?: boolean;
    }[];
  }[];
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
            fullname: emp.fullname,
            username: emp.username,
            profession: emp.job,
            avatar: emp.avatar,
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

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AddProductHeader
        onHandleClose={handleClose}
        onReset={() => reset()}
        onSaveProduct={handleSubmit((d) => console.log(d))}
      />

      <FormProvider {...methods}>
        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
          <ProductGeneralInfo selectedDomainId={selectedDomainId} />
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
