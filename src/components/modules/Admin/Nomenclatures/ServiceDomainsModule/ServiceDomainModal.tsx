import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  ServiceDomain,
  ServiceDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ServiceDomainModalProps = {
  open: boolean;
  onClose: () => void;
  data: ServiceDomain | null;
  onSuccess: () => void;
};

const DEFAULT_VALUES = {
  name: "",
  description: null,
  active: true,
};

const ServiceDomainsModal = ({
  open,
  onClose,
  data,
  onSuccess,
}: ServiceDomainModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<ServiceDomainCreateOrUpdate>({
    defaultValues: DEFAULT_VALUES,
  });

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(100);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(data || DEFAULT_VALUES);
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    ServiceDomainCreateOrUpdate,
    ServiceDomain
  >({
    key: ["create-service-domain"],
    url: `/api/nomenclatures/service-domains`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    ServiceDomainCreateOrUpdate,
    ServiceDomain
  >({
    key: ["update-service-domain", data?.id],
    url: `/api/nomenclatures/service-domains/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: ServiceDomainCreateOrUpdate) => {
    if (isEditMode) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  };

  const actions: ActionButtonType[] = [
    {
      title: isEditMode ? "Modifică" : "Adaugă",
      props: {
        onClick: handleSubmit(onSubmit),
        loading: isPendingCreate || isPendingUpdate,
        disabled: isPendingCreate || isPendingUpdate || !isDirty,
      },
    },
  ];

  return (
    <Modal
      title={
        isEditMode
          ? `Editează Domeniu Serviciu cu ID: ${data.id}`
          : "Adaugă un Domeniu Serviciu"
      }
      open={open}
      handleClose={onClose}
      actions={actions}
      maxWidth="md"
      fullWidth
    >
      <FormProvider {...methods}>
        <Stack spacing={2.5}>
          <Input
            name="name"
            placeholder="Adauga nume.."
            label="Nume"
            rules={{ ...isRequired, ...minLength, ...maxLength }}
          />

          <Input
            name="description"
            placeholder="Adauga descriere.."
            label="Descriere"
          />

          <InputCheckbox name="active" label="Activ" />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default ServiceDomainsModal;
