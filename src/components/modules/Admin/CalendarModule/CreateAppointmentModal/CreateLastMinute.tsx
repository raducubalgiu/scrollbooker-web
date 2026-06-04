import Input from "@/components/core/Input/Input";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { max, required } from "@/utils/validation-rules";
import { Box, Button, Stack, Typography } from "@mui/material";
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
      <Stack spacing={5} px={2.5}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, maxWidth: "340px", mx: "auto" }}
          >
            Reducerea procentuală introdusă mai jos se va aplica automat pentru
            orice serviciu rezervat în acest interval.
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Input
            name="discount"
            label="Discount"
            placeholder="Adauga un discount"
            type="number"
            rules={{ ...isRequired, ...maxDiscount }}
            sx={{
              "& input": {
                fontSize: "1.1rem",
                py: 1.8,
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            size="large"
            fullWidth
            disableElevation
            disabled={isLoadingLastMinute}
            loading={isLoadingLastMinute}
            sx={{
              py: 1.8,
              fontSize: "1rem",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Salveaza
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default CreateLastMinute;
