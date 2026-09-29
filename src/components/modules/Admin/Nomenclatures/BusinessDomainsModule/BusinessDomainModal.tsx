import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type BusinessDomainModalProps = {
  data: BusinessDomain | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: BusinessDomainFormData) => void;
  isSubmitting: boolean;
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
  onSave,
  isSubmitting,
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

  const actions: ActionButtonType[] = [
    {
      title: isEditMode ? "Modifică" : "Adaugă",
      props: {
        onClick: handleSubmit(onSave),
        loading: isSubmitting,
        disabled: isSubmitting || !isDirty,
      },
    },
  ];

  return (
    <Modal
      title={
        isEditMode
          ? `Editează Business Domain ID: ${data?.id}`
          : "Adaugă un Business Domain"
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
