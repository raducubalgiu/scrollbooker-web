import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
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
    <Modal open={open} handleClose={onClose} actions={actions}>
      <h2>Anulează programarea</h2>
      <p>Sigur doriți să anulați această programare?</p>
    </Modal>
  );
};

export default AppointmentCancelModal;
