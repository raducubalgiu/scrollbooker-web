import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Stack } from "@mui/material";
import Modal from "@/components/core/Modal/Modal"; // ajustează calea
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { maxField, minField, required } from "@/utils/validation-rules";
import {
  Profession,
  ProfessionCreateOrUpdate,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";

type ProfessionModalProps = {
  open: boolean;
  onClose: () => void;
  data: Profession | null;
  onSave: (data: ProfessionCreateOrUpdate) => void;
  isSubmitting: boolean;
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
  onSave,
  isSubmitting,
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
      reset(
        data
          ? {
              name: data.name ?? "",
              business_domain_id: data.business_domain_id
                ? String(data.business_domain_id)
                : "",
              active: !!data.active,
            }
          : { name: "", business_domain_id: "", active: true }
      );
    }
  }, [open, data, reset]);

  const onSubmit = (formData: ProfessionFormData) => {
    const payload: ProfessionCreateOrUpdate = {
      name: formData.name,
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
        isEditMode ? `Editează Profesia ID: ${data?.id}` : "Adaugă o Profesie"
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

export default ProfessionModal;
