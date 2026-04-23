import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { TextField } from "@mui/material";
import React from "react";

type CancelAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const CancelAppointmentModal = ({
  open,
  onClose,
}: CancelAppointmentModalProps) => {
  const actions: ActionButtonType[] = [
    {
      title: "Anuleaza programarea",
      props: {
        onClick: () => {},
      },
    },
  ];

  return (
    <Modal
      title="Anulează programarea"
      open={open}
      handleClose={onClose}
      actions={actions}
      maxWidth="sm"
      fullWidth
    >
      <TextField
        value=""
        multiline
        minRows={4}
        maxRows={4}
        fullWidth
        placeholder="Scrie motivul anularii"
      />
    </Modal>
  );
};

export default CancelAppointmentModal;
