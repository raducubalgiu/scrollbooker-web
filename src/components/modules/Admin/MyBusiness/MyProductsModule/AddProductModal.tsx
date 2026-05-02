import Modal from "@/components/core/Modal/Modal";
import React, { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import InputSelect from "@/components/core/Input/InputSelect";
import {
  ProductTypeEnum,
  getProductTypeLabel,
} from "@/ts/enums/ProductTypeEnum";
import { Box, Checkbox, Stack, Typography } from "@mui/material";
import { min, minField, required } from "@/utils/validation-rules";
import { useCustomQuery } from "@/hooks/useHttp";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";

type AddProductModalProps = {
  open: boolean;
  handleClose: () => void;
};

const AddProductModal = ({ open, handleClose }: AddProductModalProps) => {
  const methods = useForm({
    defaultValues: {
      serviceDomainId: "",
      serviceId: "",
      type: "",
      name: "",
      description: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
    watch,
  } = methods;
  const isRequired = required();

  const actions: ActionButtonType[] = [
    {
      title: "Reset",
      props: {
        variant: "outlined",
        color: "secondary",
        disabled: !isDirty,
        onClick: () => reset(),
      },
    },
    {
      title: "Adaugă",
      props: {
        color: "primary",
        disabled: !isDirty,
        onClick: handleSubmit((data) => {
          console.log(data);
        }),
      },
    },
  ];

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
    <Modal
      title="Adaugă un produs nou"
      open={open}
      handleClose={() => {
        if (isDirty) reset();
        handleClose();
      }}
      actions={actions}
      maxWidth="sm"
    >
      <FormProvider {...methods}>
        <InputSelect
          name="type"
          label="Tip serviciu"
          placeholder="Tip serviciu"
          options={ProductTypeEnum.all.map((t) => ({
            value: t as string,
            name: getProductTypeLabel(t),
          }))}
          sx={{ mb: 1.5 }}
        />

        <InputSelect
          name="serviceDomainId"
          label="Categoria"
          placeholder="Categorie"
          options={domainOptions}
          sx={{ mb: 1.5 }}
        />
        <InputSelect
          name="serviceId"
          label="Serviciu"
          placeholder="Serviciu"
          options={serviceOptions}
          sx={{ mb: 1.5 }}
        />

        <Box sx={{ p: 2, mb: 1.5, borderRadius: 2 }} bgcolor="secondary.main">
          <Typography mb={2}>Filtre</Typography>
          <Typography variant="body2" color="text.secondary">
            Gen
          </Typography>

          <Input name="genre" label="Gen" placeholder="Gen" sx={{ mt: 1.5 }} />
        </Box>

        <Input
          name="name"
          label="Nume"
          placeholder="Numele produsului"
          rules={{ ...isRequired, ...minField(3) }}
          sx={{ mb: 1.5 }}
        />
        <Input
          name="description"
          label="Descriere"
          placeholder="Descriere"
          sx={{ mb: 1.5 }}
        />
        <Input
          name="duration"
          label="Durata"
          placeholder="Durata"
          type="number"
          rules={{ ...isRequired, ...min(0) }}
          sx={{ mb: 1.5 }}
        />
        <Stack direction="row" justifyContent={"space-between"} spacing={1}>
          <Box>
            <Typography sx={{ fontWeight: 600 }}>
              Acest produs poate fi rezervat?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Produsele care NU sunt marcate ca fiind disponibile pentru
              rezervare, vor aparea in sectiunea produselor tale insa acestea
              vor avea scop doar informativ (nu vor putea fi rezervate instant
              de catre clienti)
            </Typography>
          </Box>
          <Checkbox checked={true} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default AddProductModal;
