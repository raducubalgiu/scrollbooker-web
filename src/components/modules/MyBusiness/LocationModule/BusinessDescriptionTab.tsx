"use client";

import React from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Box, Typography, Stack, Button } from "@mui/material";
import FormJoditEditor from "@/components/core/Input/FormJoditEditor";

type Props = { description?: string };

function DescriptionForm({
  defaultDescription,
}: {
  defaultDescription?: string;
}) {
  const methods = useForm<{ description: string }>({
    defaultValues: { description: defaultDescription ?? "" },
    mode: "onBlur",
  });

  const { handleSubmit, reset, control, formState } = methods;

  const onSubmit = (data: { description: string }) => {
    // placeholder: call save API
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
            />
          )}
        />

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={!formState.isDirty}
          >
            Salvează
          </Button>
          <Button
            variant="outlined"
            onClick={() => reset({ description: defaultDescription ?? "" })}
            disabled={!formState.isDirty}
          >
            Resetează
          </Button>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default function BusinessDescriptionTab({ description }: Props) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
        Descriere locație
      </Typography>
      <DescriptionForm defaultDescription={description} />
    </Box>
  );
}
