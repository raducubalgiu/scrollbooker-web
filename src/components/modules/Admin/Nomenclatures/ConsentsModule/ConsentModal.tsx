import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  Consent,
  ConsentCreateOrUpdate,
} from "@/ts/models/nomenclatures/consent/Consent";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ConsentModalProps = {
  open: boolean;
  data: Consent | null;
  onClose: () => void;
  onSuccess: () => void;
};

const ConsentModal = ({
  open,
  data,
  onClose,
  onSuccess,
}: ConsentModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<ConsentCreateOrUpdate>({
    defaultValues: {
      name: "",
      title: "",
      text: "",
      version: "",
    },
  });

  const isRequired = required();
  const minLength = minField(3);
  const maxLengthName = maxField(50);
  const maxLengthTitle = maxField(100);
  const minLengthVersion = minField(2);
  const maxLengthVersion = maxField(50);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(data || { name: "", title: "", text: "", version: "" });
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    ConsentCreateOrUpdate,
    Consent
  >({
    key: ["create-consent"],
    url: `/api/nomenclatures/consents`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    ConsentCreateOrUpdate,
    Consent
  >({
    key: ["update-consent", data?.id],
    url: `/api/nomenclatures/consents/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: ConsentCreateOrUpdate) => {
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
        isEditMode ? `Editează Consent ID: ${data.id}` : "Adaugă un Consent"
      }
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
            rules={{ ...isRequired, ...minLength, ...maxLengthName }}
          />
          <Input
            name="title"
            placeholder="Adauga titlu"
            label="Titlu"
            rules={{ ...isRequired, ...minLength, ...maxLengthTitle }}
          />
          <Input
            name="text"
            placeholder="Adauga continut formular"
            label="Formular"
            multiline
            minRows={4}
            maxRows={7}
            rules={{ ...isRequired, ...minLength }}
          />
          <Input
            name="version"
            placeholder="Adauga versiunea formularului"
            label="Versiune"
            rules={{ ...isRequired, ...minLengthVersion, ...maxLengthVersion }}
          />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default ConsentModal;
