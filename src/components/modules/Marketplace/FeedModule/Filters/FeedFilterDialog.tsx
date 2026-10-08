"use client";

import React from "react";
import { Dialog } from "@mui/material";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import FeedFilterDesktopContent from "./FeedFilterDesktopContent";

type FeedFilterDialogProps = {
  open: boolean;
  domains: ServiceDomain[];
  isLoadingDomains: boolean;
  appliedServiceIds: Set<number>;
  appliedOnlyVideoReviews: boolean;
  onApply: (serviceIds: Set<number>, onlyVideoReviews: boolean) => void;
  onClose: () => void;
};

const FeedFilterDialog = ({
  open,
  onClose,
  ...contentProps
}: FeedFilterDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <FeedFilterDesktopContent {...contentProps} onClose={onClose} />
    </Dialog>
  );
};

export default FeedFilterDialog;

const styles = {
  paper: {
    borderRadius: 3,
    height: "80vh",
    maxHeight: "80vh",
  },
} as const;
