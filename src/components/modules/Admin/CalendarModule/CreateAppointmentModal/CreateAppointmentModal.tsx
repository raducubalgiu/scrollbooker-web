import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Input from "@/components/core/Input/Input";
import Modal from "@/components/core/Modal/Modal";
import { required } from "@/utils/validation-rules";
import { Box, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

type CreateAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreateAppointmentModal = ({
  open,
  onClose,
}: CreateAppointmentModalProps) => {
  const [tab, setTab] = React.useState<number>(0);
  const methods = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      customerFullname: "",
      price: "0",
      discount: "0",
      priceWithDiscount: "0",
      duration: "0",
    },
  });
  const {} = methods;
  const isRequired = required();
  const isRequiredNumber = required({ isNumber: true });

  const handleTab = (_event: React.MouseEvent<HTMLElement>, newTab: number) => {
    setTab(newTab);
  };

  const actions: ActionButtonType[] = [
    {
      title: "Salveaza",
    },
  ];

  return (
    <Modal
      open={open}
      handleClose={onClose}
      maxWidth="md"
      fullWidth
      actions={actions}
      title="2 Iunie • 09:00 - 10:00 (30min)"
    >
      <Box px={2}>
        <FormProvider {...methods}>
          <Stack justifyContent="center">
            <ToggleButtonGroup
              value={tab}
              exclusive
              onChange={handleTab}
              aria-label="text alignment"
              sx={{
                mb: 2.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ToggleButton value={0} aria-label="left aligned">
                Programare noua
              </ToggleButton>
              <ToggleButton value={1} aria-label="centered">
                Oferta Last Minute
              </ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Stack spacing={2}>
            <Input
              name="customerFullname"
              placeholder="Nume client"
              label="Numele clientului"
              rules={{ ...isRequired }}
            />
            <Input
              name="price"
              placeholder="Pret standard"
              label="Pret standard"
              rules={{ ...isRequiredNumber }}
            />
            <Input
              name="discount"
              placeholder="Discount"
              label="Discount"
              rules={{ ...isRequiredNumber }}
            />
            <Input
              name="priceWithDiscount"
              placeholder="Pret final"
              disabled
              label="Pret final"
              rules={{ ...isRequiredNumber }}
            />
          </Stack>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default CreateAppointmentModal;
