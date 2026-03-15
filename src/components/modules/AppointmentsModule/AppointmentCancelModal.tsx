import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { TextareaAutosize } from "@mui/material";
import React from "react";

type AppointmentCancelModalProps = {
  open: boolean;
  onClose: () => void;
};

const AppointmentCancelModal: React.FC<AppointmentCancelModalProps> = ({
  open,
  onClose,
}) => {
  const actions: ActionButtonType[] = [
    {
      title: "Anulează",
      props: {
        onClick: onClose,
        variant: "outlined",
        color: "inherit",
      },
    },
    {
      title: "Confirmă",
      props: {
        onClick: () => {},
        variant: "contained",
      },
    },
  ];

  return (
    <Modal
      title="Anulează programarea"
      open={open}
      handleClose={onClose}
      actions={actions}
    >
      <p>Sigur doriți să anulați această programare?</p>

      <TextareaAutosize
        minRows={4}
        placeholder="Motiv anulare..."
        style={{
          width: "100%", // ocupă lățimea containerului
          minWidth: 420, // minWidth dorit
          padding: 12,
          borderRadius: 8,
          resize: "vertical", // permită doar redimensionare verticală
          fontFamily: "inherit",
          border: "none",
        }}
      />
    </Modal>
  );
};

export default AppointmentCancelModal;
