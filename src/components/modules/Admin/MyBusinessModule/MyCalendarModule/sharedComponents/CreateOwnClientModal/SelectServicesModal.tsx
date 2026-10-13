"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import { SelectedVariant } from "./createOwnClientTypes";
import ServicesSelectionContent from "./ServicesSelectionContent";

type SelectServicesModalProps = {
  open: boolean;
  businessId: number;
  selectedVariants: SelectedVariant[];
  onClose: () => void;
  onConfirm: (variants: SelectedVariant[]) => void;
};

const SelectServicesModal = ({
  open,
  businessId,
  selectedVariants,
  onClose,
  onConfirm,
}: SelectServicesModalProps) => {
  const [pendingVariants, setPendingVariants] =
    useState<SelectedVariant[]>(selectedVariants);

  useEffect(() => {
    if (open) setPendingVariants(selectedVariants);
  }, [open, selectedVariants]);

  const toggleVariant = (variant: SelectedVariant) => {
    setPendingVariants((prev) => {
      const isSelected = prev.some((v) => v.variantId === variant.variantId);
      if (isSelected) {
        return prev.filter((v) => v.variantId !== variant.variantId);
      }
      return [...prev, variant];
    });
  };

  return (
    <Modal
      open={open}
      handleClose={onClose}
      title="Selectează serviciile"
      maxWidth="sm"
      fullWidth
      customFooter={
        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={pendingVariants.length === 0}
          onClick={() => onConfirm(pendingVariants)}
        >
          Adaugă{pendingVariants.length > 0 ? ` (${pendingVariants.length})` : ""}
        </Button>
      }
    >
      <ServicesSelectionContent
        businessId={businessId}
        selectedVariants={pendingVariants}
        onToggleVariant={toggleVariant}
      />
    </Modal>
  );
};

export default SelectServicesModal;
