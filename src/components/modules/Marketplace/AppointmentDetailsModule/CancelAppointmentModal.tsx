"use client";

import React from "react";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import {
  Collapse,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import { maxField, minField, required } from "@/utils/validation-rules";
import { find } from "lodash";

type CancelAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
  onCancel: (canceledReason: string) => void;
  isLoadingCancel: boolean;
};

const REASONS = [
  {
    id: "CANNOT_ARRIVE",
    label: "Nu mai pot ajunge la programare",
  },
  {
    id: "FOUND_BETTER_OFFER",
    label: "Am găsit o ofertă mai bună",
  },
  {
    id: "BOOK_BY_MISTAKE",
    label: "Am rezervat din greseală",
  },
  {
    id: "OTHER",
    label: "Altele",
  },
];

const CancelAppointmentModal = ({
  open,
  onClose,
  onCancel,
  isLoadingCancel,
}: CancelAppointmentModalProps) => {
  const [reason, setReason] = React.useState("OTHER");
  const isRequired = required();
  const minLength = minField(2);
  const maxLength = maxField(100);

  const methods = useForm({ defaultValues: { canceledReason: "" } });
  const { handleSubmit, reset, watch } = methods;

  const handleChangeReason = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (watch("canceledReason")) reset();
    setReason((event.target as HTMLInputElement).value);
  };

  const actions: ActionButtonType[] = [
    {
      title: "Anuleaza programarea",
      props: {
        onClick: handleSubmit((data) => {
          if (reason === "OTHER") {
            onCancel(data.canceledReason);
          } else {
            const reasonMessage = find(REASONS, { id: reason })?.label;
            if (!reasonMessage) return;

            onCancel(reasonMessage);
          }
        }),
        disabled: isLoadingCancel,
        loading: isLoadingCancel,
      },
    },
  ];

  return (
    <FormProvider {...methods}>
      <Modal
        title="Anulează programarea"
        open={open}
        handleClose={onClose}
        actions={actions}
        maxWidth="sm"
        fullWidth
      >
        <Typography variant="h6" fontWeight={600}>
          Motivul anulării
        </Typography>
        <FormControl sx={{ my: 1.5 }}>
          <RadioGroup
            aria-labelledby="group-reason"
            defaultValue="other"
            name="radio-buttons-group"
            value={reason}
            onChange={handleChangeReason}
          >
            {REASONS.map((item) => (
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Collapse in={reason === "OTHER"} timeout={300} unmountOnExit>
          <Input
            name="canceledReason"
            multiline
            minRows={4}
            maxRows={4}
            fullWidth
            placeholder="Scrie motivul anularii"
            slotProps={{
              htmlInput: {
                maxLength: 100,
              },
            }}
            sx={{
              mt: 1,
              "& .MuiInputBase-root": {
                transition: "all 0.3s ease",
                borderRadius: 5,
              },
            }}
            rules={{ ...isRequired, ...minLength, ...maxLength }}
          />
          <Stack alignItems="flex-end" mt={1}>
            <Stack flexDirection="row" alignItems="center">
              <Typography>{watch("canceledReason").length}</Typography>
              <Typography mx={1}>/</Typography>
              <Typography>100</Typography>
            </Stack>
          </Stack>
        </Collapse>
      </Modal>
    </FormProvider>
  );
};

export default CancelAppointmentModal;
