import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import {
  Filter,
  FilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/filter/FilterType";
import { maxField, minField, required } from "@/utils/validation-rules";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";

type FiltersModalProps = {
  open: boolean;
  onClose: () => void;
  data: Filter | null;
  onSave: (data: FilterCreateOrUpdate) => void;
  isSubmitting: boolean;
};

type FilterFormData = {
  name: string;
  single_select: boolean;
  active: boolean;
};

const DEFAULT_VALUES = {
  name: "",
  single_select: true,
  active: true,
};

const FiltersModal = ({
  open,
  onClose,
  data,
  onSave,
  isSubmitting,
}: FiltersModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<FilterFormData>({
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
      reset(data || DEFAULT_VALUES);
    }
  }, [open, data, reset]);

  const onSubmit = (formData: FilterFormData) => {
    const payload: FilterCreateOrUpdate = {
      name: formData.name,
      single_select: formData.single_select,
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
        isEditMode ? `Editează filtrul cu ID: ${data?.id}` : "Adaugă un filtru"
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

          <InputCheckbox
            name="single_select"
            label="Single Select"
            sx={{ fontSize: 30 }}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default FiltersModal;
