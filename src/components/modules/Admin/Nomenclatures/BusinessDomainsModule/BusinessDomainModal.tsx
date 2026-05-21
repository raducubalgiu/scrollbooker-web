import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  BusinessDomain,
  BusinessDomainCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type BusinessDomainModalProps = {
  data: BusinessDomain | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type BusinessDomainFormData = {
  name: string;
  short_name: string;
  active: boolean;
};

const BusinessDomainModal = ({
  open,
  data,
  onClose,
  onSuccess,
}: BusinessDomainModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<BusinessDomainFormData>({
    defaultValues: {
      name: "",
      short_name: "",
      active: false,
    },
  });

  const isRequired = required();
  const minLengthName = minField(3);
  const maxLengthName = maxField(255);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(data || { name: "", short_name: "", active: true });
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    BusinessDomainCreateOrUpdate,
    BusinessDomain
  >({
    key: ["create-business-domain"],
    url: `/api/nomenclatures/business-domains`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    BusinessDomainCreateOrUpdate,
    BusinessDomain
  >({
    key: ["create-business-domain", data?.id],
    url: `/api/nomenclatures/business-domains/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: BusinessDomainFormData) => {
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
          ? `Editeaza Business Domain ID: ${data.id}`
          : "Adauga un Business Domain"
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
            placeholder="Adauga nume"
            label="Nume"
            rules={{ ...isRequired, ...minLengthName, ...maxLengthName }}
          />
          <Input
            name="short_name"
            placeholder="Adauga nume scurt"
            label="Nume scurt"
            rules={{ ...isRequired, ...minLengthName, ...maxLengthName }}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default BusinessDomainModal;
