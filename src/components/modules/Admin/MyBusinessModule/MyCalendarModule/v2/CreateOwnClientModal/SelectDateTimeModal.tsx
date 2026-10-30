"use client";

import React from "react";
import Modal from "@/components/core/Modal/Modal";
import DateTimeSelectionContent, {
  DateTimeSelectionContentProps,
} from "./DateTimeSelectionContent";

type SelectDateTimeModalProps = DateTimeSelectionContentProps & {
  open: boolean;
  onClose: () => void;
};

const SelectDateTimeModal = ({
  open,
  onClose,
  ...contentProps
}: SelectDateTimeModalProps) => {
  return (
    <Modal
      open={open}
      handleClose={onClose}
      title="Alege data și ora"
      maxWidth="sm"
      fullWidth
      dividers={false}
    >
      <DateTimeSelectionContent {...contentProps} />
    </Modal>
  );
};

export default SelectDateTimeModal;
