import Input from "@/components/core/Input/Input";
import { CalendarEventsSlot } from "@/ts/models/booking/availability/CalendarEvents";
import { maxField, min, minField, required } from "@/utils/validation-rules";
import { Button, DialogActions, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export type CreateOwnClientFormData = {
  customerFullname: string;
  productName: string;
  price: string;
  discount: string;
  priceWithDiscount: string;
  duration: string;
};

type CreateOwnClientProps = {
  slot: CalendarEventsSlot | null;
  onCreateOwnClient: (
    data: CreateOwnClientFormData,
    slot: CalendarEventsSlot
  ) => void;
  isLoadingOwnClient: boolean;
};

const CreateOwnClient = ({
  slot,
  onCreateOwnClient,
  isLoadingOwnClient,
}: CreateOwnClientProps) => {
  const methods = useForm<CreateOwnClientFormData>({
    defaultValues: {
      customerFullname: "",
      productName: "",
      price: "0",
      discount: "0",
      priceWithDiscount: "0",
      duration: "0",
    },
  });
  const { handleSubmit, watch, setValue } = methods;

  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    const numericPrice = parseFloat(price) || 0;
    const numericDiscount = parseFloat(discount) || 0;

    const finalPrice = Math.max(0, numericPrice - numericDiscount);

    setValue("priceWithDiscount", finalPrice.toString());
  }, [price, discount, setValue]);

  const isRequired = required();
  const isRequiredNumber = required({ isNumber: true });
  const minPrice = min(10);
  const minProductNameLength = minField(3);
  const maxProductNameLength = maxField(100);

  const onSubmit = (data: CreateOwnClientFormData) => {
    if (!slot?.start_date_utc || !slot?.end_date_utc) return;
    onCreateOwnClient(data, slot);
  };

  return (
    <FormProvider {...methods}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            Detalii Client
          </Typography>
          <Input
            name="customerFullname"
            placeholder="Adaugă numele clientului"
            label="Numele clientului"
            rules={{ ...isRequired }}
          />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">
            Detalii Servicii
          </Typography>
          <Input
            name="productName"
            placeholder="Nume serviciu"
            label="Numele serviciului"
            rules={{
              ...isRequired,
              ...minProductNameLength,
              ...maxProductNameLength,
            }}
          />
          <Input
            name="price"
            placeholder="Pret standard"
            label="Pret standard"
            type="number"
            rules={{ ...isRequiredNumber, ...minPrice }}
          />
          <Input
            name="discount"
            placeholder="Discount"
            label="Discount"
            type="number"
            rules={{ ...isRequiredNumber }}
          />
          <Input
            name="priceWithDiscount"
            placeholder="Pret final"
            disabled
            label="Pret final"
            type="number"
            rules={{ ...isRequiredNumber }}
          />
        </Stack>
      </Stack>

      <DialogActions sx={{ mt: 2.5 }}>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          size="large"
          disableElevation
          disabled={isLoadingOwnClient}
          loading={isLoadingOwnClient}
        >
          Salveaza
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default CreateOwnClient;
