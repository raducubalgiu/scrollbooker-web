import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Dialog } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useCustomQuery } from "@/hooks/useHttp";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import AddProductHeader from "./AddProductHeader";
import ProductGeneralInfo from "./ProductGeneralInfo";
import ProductVariants from "./ProductVariants";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";

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
      type: "",
      serviceDomainId: "",
      serviceId: "",
      name: "",
      description: "",
      can_be_booked: true,
      variants: [
        {
          name: "",
          duration: 30,
          has_different_prices: false,
          offerings: [],
        },
      ],
    },
  });

  const { control, handleSubmit, reset, watch } = methods;

  const { data: serviceDomainServices } = useCustomQuery<
    SelectedServiceDomainWithServices[]
  >({
    key: "my-services",
    url: "/api/my-services",
  });

  const selectedDomainId = watch("serviceDomainId");

  const validDomains = useMemo(() => {
    if (!serviceDomainServices) return [];

    return serviceDomainServices.filter((domain) =>
      domain.services.some((s) => s.is_selected === true)
    );
  }, [serviceDomainServices]);

  const domainOptions = useMemo(
    () =>
      validDomains.map((d) => ({
        value: d.id.toString(),
        name: d.name,
      })),
    [validDomains]
  );

  console.log("DOMAIN OPTIONS!!", domainOptions);

  const serviceOptions = useMemo(() => {
    if (!selectedDomainId || !validDomains.length) return [];

    const domain = validDomains.find((d) => d.id === Number(selectedDomainId));

    if (!domain) return [];

    return domain.services
      .filter((s) => s.is_selected)
      .map((s) => ({
        value: s.id.toString(),
        name: s.name,
      }));
  }, [selectedDomainId, validDomains]);

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
      <AddProductHeader
        onHandleClose={handleClose}
        onReset={() => methods.reset()}
        onSaveProduct={methods.handleSubmit((d) => console.log(d))}
      />

      <FormProvider {...methods}>
        <Grid
          container
          sx={{
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <ProductGeneralInfo
            domainOptions={domainOptions}
            serviceOptions={serviceOptions}
          />

          <ProductVariants
            hasEmployees={hasEmployees}
            control={control}
            watch={watch}
          />
        </Grid>
      </FormProvider>
    </Dialog>
  );
};

export default AddProductModal;
