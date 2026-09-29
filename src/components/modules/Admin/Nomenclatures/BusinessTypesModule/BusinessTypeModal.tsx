import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import Modal from "@/components/core/Modal/Modal";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  BusinessType,
  BusinessTypeCreateOrUpdate,
} from "@/ts/models/nomenclatures/businessType/BusinessType";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type BusinessTypeModalProps = {
  open: boolean;
  onClose: () => void;
  data: BusinessType | null;
  onSave: (data: BusinessTypeCreateOrUpdate) => void;
  isSubmitting: boolean;
  businessDomains: BusinessDomain[];
};

type BusinessTypeFormData = {
  name: string;
  plural: string;
  business_domain_id: string;
  active: boolean;
};

const BusinessTypeModal = ({
  open,
  onClose,
  data,
  onSave,
  isSubmitting,
  businessDomains,
}: BusinessTypeModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<BusinessTypeFormData>({
    defaultValues: {
      name: "",
      plural: "",
      business_domain_id: "",
      active: true,
    },
  });

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(50);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(
        data
          ? {
              name: data.name ?? "",
              plural: (data.plural as string) ?? "",
              business_domain_id: String(data.business_domain_id ?? ""),
              active: !!data.active,
            }
          : { name: "", plural: "", business_domain_id: "", active: true }
      );
    }
  }, [open, data, reset]);

  const onSubmit = (formData: BusinessTypeFormData) => {
    const payload: BusinessTypeCreateOrUpdate = {
      name: formData.name,
      plural: formData.plural,
      business_domain_id: Number(formData.business_domain_id),
      active: formData.active,
    };

    onSave(payload);
  };

  const actions: ActionButtonType[] = [
    {
      title: isEditMode ? "Modifică" : "Adaugă",
      props: {
        onClick: handleSubmit(onSubmit),
        loading: isSubmitting,
        disabled: isSubmitting || !isDirty,
      },
    },
  ];

  return (
    <Modal
      title={
        isEditMode
          ? `Editează Business Type ID: ${data?.id}`
          : "Adaugă un Business Type"
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
            name="plural"
            placeholder="Adauga plural.."
            label="Plural"
            rules={{ ...isRequired, ...minLength, ...maxLength }}
          />

          <InputSelect
            name="business_domain_id"
            label="Domeniu Business"
            options={businessDomains.map((bd) => ({
              value: String(bd.id),
              name: bd.name,
            }))}
            rules={isRequired}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default BusinessTypeModal;
