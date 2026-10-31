"use client";

import { useLayoutEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import MainLayoutFooterActions from "@/components/cutomized/MainLayout/MainLayoutFooterActions";
import Input from "@/components/core/Input/Input";
import { maxField, minField } from "@/utils/validation-rules";
import { useUpdateBusinessDescription } from "@/controllers/booking/business.controller";

type MyBusinessDescriptionTabProps = {
  businessId: number;
  defaultDescription: string | null;
  onFooterChange: (footer: React.ReactNode) => void;
};

type FormValues = {
  description: string;
};

const DESCRIPTION_RULES = { ...minField(5), ...maxField(2500) };

export default function MyBusinessDescriptionTab({
  businessId,
  defaultDescription,
  onFooterChange,
}: MyBusinessDescriptionTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate, isPending } = useUpdateBusinessDescription();

  const methods = useForm<FormValues>({
    values: { description: defaultDescription ?? "" },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const onSubmit = (data: FormValues) => {
    mutate(
      { businessId, data },
      {
        onSuccess: () => {
          reset(data);
          setIsEditing(false);
          toast.success("Descrierea a fost salvată cu succes.");
        },
      }
    );
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

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
            disabled: isPending || !isDirty,
            loading: isPending,
          },
        },
      ]
    : [{ title: "Editează", props: { onClick: () => setIsEditing(true) } }];

  useLayoutEffect(() => {
    onFooterChange(<MainLayoutFooterActions actions={actions} />);
    return () => onFooterChange(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, isPending, isDirty]);

  return (
    <Paper sx={{ p: 2.5 }}>
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
            rules={DESCRIPTION_RULES}
          />
        </Box>
      </FormProvider>
    </Paper>
  );
}
