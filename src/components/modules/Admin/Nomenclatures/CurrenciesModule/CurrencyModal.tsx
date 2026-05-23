import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  Currency,
  CurrencyCreateOrUpdate,
} from "@/ts/models/nomenclatures/currency/Currency";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type CurrencyModalProps = {
  open: boolean;
  data: Currency | null;
  onClose: () => void;
  onSuccess: () => void;
};

const CurrencyModal = ({
  open,
  data,
  onClose,
  onSuccess,
}: CurrencyModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<CurrencyCreateOrUpdate>({
    defaultValues: {
      name: "",
      active: true,
    },
  });

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(3);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(data || { name: "", active: true });
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    CurrencyCreateOrUpdate,
    Currency
  >({
    key: ["create-currency"],
    url: `/api/nomenclatures/currencies`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    CurrencyCreateOrUpdate,
    Currency
  >({
    key: ["update-currency", data?.id],
    url: `/api/nomenclatures/currencies/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: CurrencyCreateOrUpdate) => {
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
      title={isEditMode ? `Editează Moneda ID: ${data.id}` : "Adaugă o monedă"}
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
    >
      <FormProvider {...methods}>
        <Stack spacing={2.5}>
          <Input
            name="name"
            placeholder="Adauga numele"
            label="Nume"
            rules={{ ...isRequired, ...minLength, ...maxLength }}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default CurrencyModal;
