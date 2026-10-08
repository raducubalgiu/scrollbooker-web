"use client";

import React from "react";
import { Drawer, ThemeProvider } from "@mui/material";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { darkTheme } from "../../../../../../theme/theme";
import FeedFilterContent from "./FeedFilterContent";

type FeedFilterMobileOverlayProps = {
  open: boolean;
  domains: ServiceDomain[];
  isLoadingDomains: boolean;
  appliedServiceIds: Set<number>;
  appliedOnlyVideoReviews: boolean;
  onApply: (serviceIds: Set<number>, onlyVideoReviews: boolean) => void;
  onClose: () => void;
};

const FeedFilterMobileOverlay = ({
  open,
  onClose,
  ...contentProps
}: FeedFilterMobileOverlayProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        slotProps={{ paper: { sx: styles.paper } }}
      >
        <FeedFilterContent {...contentProps} onClose={onClose} />
      </Drawer>
    </ThemeProvider>
  );
};

export default FeedFilterMobileOverlay;

const styles = {
  paper: {
    width: "90%",
    bgcolor: "common.black",
  },
} as const;
