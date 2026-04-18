"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Typography } from "@mui/material";
import ActionButton, {
  ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";

type BusinessDescriptionTabProps = { defaultDescription?: string };

export default function BusinessDescriptionTab({
  defaultDescription,
}: BusinessDescriptionTabProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const methods = useForm<{ description: string }>({
    defaultValues: { description: defaultDescription ?? "" },
    mode: "onBlur",
  });

  const { handleSubmit, reset } = methods;

  const cancel: ActionButtonType[] = isDisabled
    ? []
    : [
        {
          title: "Renunță",
          props: {
            variant: "outlined",
            color: "secondary",
            onClick: () => {
              reset({ description: defaultDescription ?? "" });
              setIsDisabled(true);
            },
          },
        },
      ];

  const actions: ActionButtonType[] = [
    ...cancel,
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
        disableElevation: true,
      },
    },
  ];

  const onSubmit = (data: { description: string }) => {
    console.log("save description", data.description);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2.5 }}>
        Descriere locație
      </Typography>

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="description"
            multiline
            minRows={5}
            placeholder="Adauga o descriere..."
            disabled={isDisabled}
          />

          <ActionButton actions={actions} />
        </Box>
      </FormProvider>
    </Box>
  );
}
