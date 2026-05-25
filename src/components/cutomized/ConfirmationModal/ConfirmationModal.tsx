"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Typography } from "@mui/material";
import React from "react";

type ConfirmationModalProps = {
  title?: string;
  isLoading?: boolean;
  message: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  title,
  isLoading = false,
  message,
  open,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  const actions: ActionButtonType[] = [
    {
      title: "Renunță",
      props: {
        onClick: onClose,
        color: "secondary",
        variant: "outlined",
        disabled: isLoading,
      },
    },
    {
      title: "Anulează",
      props: {
        onClick: onConfirm,
        loading: isLoading,
        disabled: isLoading,
      },
    },
  ];

  return (
    <Modal title={title} open={open} handleClose={onClose} actions={actions}>
      <Typography>{message}</Typography>
    </Modal>
  );
}
