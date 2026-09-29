import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import Input from "@/components/core/Input/Input";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { maxField, minField, required } from "@/utils/validation-rules";
import {
  Consent,
  ConsentCreateOrUpdate,
} from "@/ts/models/nomenclatures/consent/Consent";

type ConsentModalProps = {
  open: boolean;
  data: Consent | null;
  onClose: () => void;
  onSave: (data: ConsentCreateOrUpdate) => void;
  isSubmitting: boolean;
};

const ConsentModal = ({
  open,
  data,
  onClose,
  onSave,
  isSubmitting,
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
      reset(
        data
          ? {
              name: data.name ?? "",
              title: data.title ?? "",
              text: data.text ?? "",
              version: data.version ?? "",
            }
          : { name: "", title: "", text: "", version: "" }
      );
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
        isEditMode ? `Editează Consent ID: ${data?.id}` : "Adaugă un Consent"
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
