import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  allServiceTypeEnums,
  ServiceTypeEnum,
  serviceTypefromKey,
  serviceTypeLabels,
} from "@/ts/enums/ServiceTypeEnum";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  Service,
  ServiceCreateOrUpdate,
} from "@/ts/models/nomenclatures/service/Service";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type ServiceModalProps = {
  open: boolean;
  onClose: () => void;
  data: Service | null;
  onSuccess: () => void;
  businessDomains: BusinessDomain[];
};

type ServiceFormData = {
  name: string;
  short_name: string;
  description: string;
  business_domain_id: string;
  type: string;
  active: boolean;
};

const DEFAULT_VALUES = {
  name: "",
  short_name: "",
  description: "",
  business_domain_id: "",
  type: ServiceTypeEnum.APPOINTMENT,
  active: true,
};

const ServiceModal = ({
  open,
  onClose,
  data,
  onSuccess,
  businessDomains,
}: ServiceModalProps) => {
  const isEditMode = !!data;

  const methods = useForm<ServiceFormData>({ defaultValues: DEFAULT_VALUES });

  const isRequired = required();
  const minLength = minField(3);
  const maxLength = maxField(50);

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  useEffect(() => {
    if (!open) return;

    if (data) {
      reset({
        ...DEFAULT_VALUES,
        ...data,
        business_domain_id:
          data.business_domain_id != null
            ? String(data.business_domain_id)
            : "",
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [open, data, reset]);

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    ServiceCreateOrUpdate,
    Service
  >({
    key: ["create-service"],
    url: `/api/nomenclatures/services`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    ServiceCreateOrUpdate,
    Service
  >({
    key: ["update-service", data?.id],
    url: `/api/nomenclatures/services/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    const type = serviceTypefromKey(data.type);
    if (!type) return;

    const payload: ServiceCreateOrUpdate = {
      name: data.name,
      short_name: data.short_name,
      description: data.name,
      business_domain_id: Number(data.business_domain_id),
      type,
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
        isEditMode ? `Editează Service ID: ${data.id}` : "Adaugă un Service"
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
            name="short_name"
            placeholder="Adauga Nume scurt.."
            label="Nume scurt"
            rules={{ ...isRequired, ...minLength, ...maxLength }}
          />

          <Input
            name="description"
            placeholder="Adauga descriere.."
            label="Descriere"
            rules={{ ...maxLength }}
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

          <InputSelect
            label="Tipul serviciului"
            name="type"
            options={allServiceTypeEnums.map((fil) => {
              return {
                value: fil,
                name: serviceTypeLabels[fil],
              };
            })}
          />

          <InputCheckbox name="active" label="Activ" sx={{ fontSize: 30 }} />
        </Stack>
      </FormProvider>
    </Modal>
  );
};

export default ServiceModal;
