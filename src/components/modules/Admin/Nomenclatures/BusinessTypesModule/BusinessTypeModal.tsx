import Modal from "@/components/core/Modal/Modal";
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";
import React from "react";

type BusinessTypeModalProps = {
  open: boolean;
  onClose: () => void;
  data: BusinessType | null;
};

const BusinessTypeModal = ({ open, onClose, data }: BusinessTypeModalProps) => {
  return <Modal open={open} handleClose={onClose}></Modal>;
};

export default BusinessTypeModal;
