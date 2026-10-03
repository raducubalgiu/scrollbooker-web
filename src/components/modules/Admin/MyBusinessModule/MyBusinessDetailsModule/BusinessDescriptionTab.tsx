"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import { useMutate } from "@/hooks/useHttp";
import { toast } from "react-toastify";
import { maxField, minField } from "@/utils/validation-rules";

type BusinessDescriptionTabProps = {
  businessId: number;
  defaultDescription: string | null;
};

type FormValues = {
  description: string;
};

export default function BusinessDescriptionTab({
  businessId,
  defaultDescription,
}: BusinessDescriptionTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [savedDescription, setSavedDescription] = useState(
    defaultDescription ?? ""
  );
  const minLength = minField(5);
  const maxLength = maxField(2500);

  const methods = useForm<FormValues>({
    defaultValues: {
      description: defaultDescription ?? "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, reset, watch } = methods;
  const currentDescription = watch("description");

  useEffect(() => {
    const nextValue = defaultDescription ?? "";
    setSavedDescription(nextValue);
    reset({ description: nextValue });
    setIsEditing(false);
  }, [defaultDescription, reset]);

  const { mutate: updateDescription, isPending } = useMutate({
    key: ["update-business-description", businessId],
    url: `/api/businesses/${businessId}/description`,
    method: "PUT",
    options: {
      onSuccess: (_response: unknown, variables: FormValues) => {
        const nextValue = variables.description ?? "";
        setSavedDescription(nextValue);
        reset({ description: nextValue });
        setIsEditing(false);
        toast.success("Descrierea a fost salvată cu succes.");
      },
      onError: () => {
        reset({ description: savedDescription });
        setIsEditing(false);
        toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu.");
      },
    },
  });

  const onSubmit = (data: FormValues) => {
    updateDescription(data);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    reset({ description: savedDescription });
    setIsEditing(false);
  };

  const hasChanges = currentDescription !== savedDescription;

  const actions: ActionButtonType[] = isEditing
    ? [
        {
          title: "Renunță",
          props: {
            variant: "outlined",
            color: "secondary",
            onClick: handleCancel,
            disabled: isPending,
          },
        },
        {
          title: "Salvează",
          props: {
            onClick: handleSubmit(onSubmit),
            disabled: isPending || !hasChanges,
            loading: isPending,
          },
        },
      ]
    : [
        {
          title: "Editează",
          props: {
            onClick: handleEdit,
          },
        },
      ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2.5 }}>
        Descriere locație
      </Typography>

      <FormProvider {...methods}>
        <Box>
          <Input
            name="description"
            multiline
            minRows={5}
            placeholder="Adaugă o descriere..."
            disabled={!isEditing || isPending}
            rules={{ ...minLength, ...maxLength }}
          />

          <ActionButton actions={actions} />
        </Box>
      </FormProvider>
    </Box>
  );
}
