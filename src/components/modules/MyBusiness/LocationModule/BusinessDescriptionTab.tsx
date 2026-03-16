"use client";

import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import FormJoditEditor from "@/components/core/Input/FormJoditEditor";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";

type BusinessDescriptionTabProps = { description?: string };
type DescriptionFormProps = { defaultDescription?: string };

function DescriptionForm({ defaultDescription }: DescriptionFormProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const methods = useForm<{ description: string }>({
    defaultValues: { description: defaultDescription ?? "" },
    mode: "onBlur",
  });

  const { handleSubmit, reset, control } = methods;

  const cancel: ActionButtonType[] = isDisabled
    ? []
    : [
        {
          title: "Renunță",
          props: {
            variant: "outlined",
            onClick: () => {
              reset({ description: defaultDescription ?? "" });
              setIsDisabled(true);
            },
          },
        },
      ];

  const actions: ActionButtonType[] = [
    {
      title: isDisabled ? "Editează" : "Salvează",
      props: {
        onClick: () => {
          if (isDisabled) {
            setIsDisabled(false);
          } else {
            reset({ description: defaultDescription ?? "" });
            setIsDisabled(true);
          }
        },
      },
    },
    ...cancel,
  ];

  const onSubmit = (data: { description: string }) => {
    console.log("save description", data.description);
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <FormJoditEditor
              value={field.value}
              onChange={field.onChange}
              placeholder="Descrie locația, serviciile, politici etc."
              isDisabled={isDisabled}
            />
          )}
        />

        <ActionButton actions={actions} />
      </Box>
    </FormProvider>
  );
}

export default function BusinessDescriptionTab({
  description,
}: BusinessDescriptionTabProps) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 5 }}>
        Descriere locație
      </Typography>
      <DescriptionForm defaultDescription={description} />
    </Box>
  );
}
