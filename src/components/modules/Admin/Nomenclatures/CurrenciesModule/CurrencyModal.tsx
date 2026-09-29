import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import {
  Currency,
  CurrencyCreateOrUpdate,
} from "@/ts/models/nomenclatures/currency/Currency";
import { maxField, minField, required } from "@/utils/validation-rules";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import Modal from "@/components/core/Modal/Modal";
import Input from "@/components/core/Input/Input";

type CurrencyModalProps = {
  open: boolean;
  data: Currency | null;
  onClose: () => void;
  onSave: (data: CurrencyCreateOrUpdate) => void;
  isSubmitting: boolean;
};

const CurrencyModal = ({
  open,
  data,
  onClose,
  onSave,
  isSubmitting,
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
      title={isEditMode ? `Editează Moneda ID: ${data?.id}` : "Adaugă o monedă"}
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
