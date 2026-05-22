import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
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
  onSuccess: () => void;
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
  onSuccess,
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
        data || { name: "", plural: "", business_domain_id: "", active: true }
      );
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    BusinessTypeCreateOrUpdate,
    BusinessType
  >({
    key: ["create-business-type"],
    url: `/api/nomenclatures/business-types`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    BusinessTypeCreateOrUpdate,
    BusinessType
  >({
    key: ["create-business-type", data?.id],
    url: `/api/nomenclatures/business-types/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: BusinessTypeFormData) => {
    const payload: BusinessTypeCreateOrUpdate = {
      name: data.name,
      plural: data.name,
      business_domain_id: Number(data.business_domain_id),
      active: data.active,
    };

    if (isEditMode) {
      handleUpdate(payload);
    } else {
      handleCreate(payload);
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
          ? `Editează Business Type ID: ${data.id}`
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
            placeholder="Selecteaza un Business Domain"
            options={businessDomains.map((bd) => {
              return {
                value: String(bd.id),
                name: bd.name,
              };
            })}
            rules={isRequired}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default BusinessTypeModal;
