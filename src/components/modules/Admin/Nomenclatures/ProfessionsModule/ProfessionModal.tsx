import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  Profession,
  ProfessionCreateOrUpdate,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ProfessionModalProps = {
  open: boolean;
  onClose: () => void;
  data: Profession | null;
  onSuccess: () => void;
  businessDomains: BusinessDomain[];
};

type ProfessionFormData = {
  name: string;
  business_domain_id: string;
  active: boolean;
};

const ProfessionModal = ({
  open,
  onClose,
  data,
  onSuccess,
  businessDomains,
}: ProfessionModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<ProfessionFormData>({
    defaultValues: {
      name: "",
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
      reset(data || { name: "", business_domain_id: "", active: true });
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    ProfessionCreateOrUpdate,
    Profession
  >({
    key: ["create-profession"],
    url: `/api/nomenclatures/professions`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    ProfessionCreateOrUpdate,
    Profession
  >({
    key: ["update-profession", data?.id],
    url: `/api/nomenclatures/professions/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: ProfessionFormData) => {
    const payload: ProfessionCreateOrUpdate = {
      name: data.name,
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
        isEditMode ? `Editează Profesia ID: ${data.id}` : "Adaugă o Profesie"
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

          <InputSelect
            name="business_domain_id"
            label="Domeniu Business"
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

export default ProfessionModal;
