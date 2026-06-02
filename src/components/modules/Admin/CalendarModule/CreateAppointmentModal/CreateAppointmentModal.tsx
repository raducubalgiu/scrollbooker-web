import Modal from "@/components/core/Modal/Modal";
import React from "react";

type CreateAppointmentModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreateAppointmentModal = ({
  open,
  onClose,
}: CreateAppointmentModalProps) => {
  return <Modal open={open} handleClose={onClose}></Modal>;
};

export default CreateAppointmentModal;
