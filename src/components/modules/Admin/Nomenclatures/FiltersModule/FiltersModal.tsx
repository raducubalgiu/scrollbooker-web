import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import InputCheckbox from "@/components/core/Input/InputCheckbox";
import InputSelect from "@/components/core/Input/InputSelect";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import {
  allFilterEnums,
  filterLabels,
  FilterTypeEnum,
  filterTypefromKey,
} from "@/ts/enums/FilterTypeEnum";
import {
  Filter,
  FilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/filter/FilterType";
import { maxField, minField, required } from "@/utils/validation-rules";
import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
  data: Filter | null;
  onSuccess: () => void;
};

type FilterFormData = {
  name: string;
  type: string;
  single_select: boolean;
  active: boolean;
};

const DEFAULT_VALUES = {
  name: "",
  type: FilterTypeEnum.OPTIONS,
  single_select: true,
  active: true,
};

const FiltersModal = ({ open, onClose, data, onSuccess }: FilterModalProps) => {
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

  const { mutate: handleCreate, isPending: isPendingCreate } = useMutate<
    FilterCreateOrUpdate,
    Filter
  >({
    key: ["create-filter"],
    url: `/api/nomenclatures/filters`,
    method: "POST",
    options: {
      onSuccess,
    },
  });

  const { mutate: handleUpdate, isPending: isPendingUpdate } = useMutate<
    FilterCreateOrUpdate,
    Filter
  >({
    key: ["update-filters", data?.id],
    url: `/api/nomenclatures/filters/${data?.id}`,
    method: "PUT",
    options: {
      onSuccess,
    },
  });

  const onSubmit = (data: FilterFormData) => {
    const type = filterTypefromKey(data.type);
    if (!type) return;

    const payload: FilterCreateOrUpdate = {
      name: data.name,
      type,
      single_select: data.single_select,
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
        isEditMode ? `Editează filtrul cu ID: ${data.id}` : "Adaugă un filtru"
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
            label="Tipul filtrului"
            name="type"
            options={allFilterEnums.map((fil) => {
              return {
                value: fil,
                name: filterLabels[fil],
              };
            })}
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
