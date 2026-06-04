import Input from "@/components/core/Input/Input";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { max, required } from "@/utils/validation-rules";
import { Button, DialogActions } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type CreateLastMinuteProps = {
  slot: CalendarEventsSlot | null;
  onCreateLastMinute: (discount: number, slot: CalendarEventsSlot) => void;
  isLoadingLastMinute: boolean;
};

type CreateLastMinuteFormData = {
  discount: string;
};

const CreateLastMinute = ({
  slot,
  onCreateLastMinute,
  isLoadingLastMinute,
}: CreateLastMinuteProps) => {
  const methods = useForm<CreateLastMinuteFormData>({
    defaultValues: {
      discount: "0",
    },
  });
  const { handleSubmit } = methods;
  const isRequired = required({ isNumber: true });
  const maxDiscount = max(90);

  const onSubmit = (data: CreateLastMinuteFormData) => {
    if (!slot?.start_date_utc || !slot?.end_date_utc) return;
    onCreateLastMinute(Number(data.discount), slot);
  };

  return (
    <FormProvider {...methods}>
      <Input
        name="discount"
        label="Discount"
        placeholder="Adauga un discount"
        type="number"
        rules={{ ...isRequired, ...maxDiscount }}
      />

      <DialogActions sx={{ mt: 2.5 }}>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          size="large"
          disableElevation
          disabled={isLoadingLastMinute}
          loading={isLoadingLastMinute}
        >
          Salveaza
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default CreateLastMinute;
