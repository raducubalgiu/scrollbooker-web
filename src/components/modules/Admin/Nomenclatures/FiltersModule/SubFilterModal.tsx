import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import { SubFilter } from "@/ts/models/nomenclatures/subFilter/SubFilter";
import { maxField, minField, required } from "@/utils/validation-rules";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";

type SubFilterModalProps = {
  open: boolean;
  onClose: () => void;
  data: SubFilter | null;
  onSave: (data: SubFilterFormData) => void;
  isSubmitting: boolean;
};

export type SubFilterFormData = {
  name: string;
  description: string;
  active: boolean;
};

const DEFAULT_VALUES: SubFilterFormData = {
  name: "",
  description: "",
  active: true,
};

const SubFilterModal = ({
  open,
  onClose,
  data,
  onSave,
  isSubmitting,
}: SubFilterModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<SubFilterFormData>({
    defaultValues: DEFAULT_VALUES,
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
              name: data.name,
              description: data.description || "",
              active: data.active ?? true,
            }
          : DEFAULT_VALUES
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
        isEditMode
          ? `Editează subfiltrul cu ID: ${data?.id}`
          : "Adaugă un subfiltru"
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

          {!isEditMode && (
            <Input
              name="description"
              placeholder="Adauga descriere.."
              label="Descriere"
            />
          )}

          {isEditMode && (
            <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
          )}
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default SubFilterModal;
