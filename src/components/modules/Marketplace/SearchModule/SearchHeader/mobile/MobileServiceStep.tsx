import { Box } from "@mui/material";
import React from "react";
import ServicesSection from "../sections/services/ServicesSection";
import MobileSheetActions from "./MobileSheetActions";

type MobileServiceStepProps = {
  selectedServiceDomainId: number;
  selectedServiceDomainName: string;
  selectedServiceId: number | null;
  selectedSubFilterIds: number[];
  onBack: () => void;
  onSelectServiceId: (serviceId: number | null) => void;
  onSelectSubFilterIds: (subFilterIds: number[]) => void;
  onClear: () => void;
};

const MobileServiceStep = ({
  selectedServiceDomainId,
  selectedServiceDomainName,
  selectedServiceId,
  selectedSubFilterIds,
  onBack,
  onSelectServiceId,
  onSelectSubFilterIds,
  onClear,
}: MobileServiceStepProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.scrollArea}>
        <ServicesSection
          selectedServiceDomainId={selectedServiceDomainId}
          selectedServiceDomainName={selectedServiceDomainName}
          selectedServiceId={selectedServiceId}
          selectedSubFilterIds={selectedSubFilterIds}
          onClose={onBack}
          onSelectServiceId={onSelectServiceId}
          onSelectSubFilterIds={onSelectSubFilterIds}
        />
      </Box>

      <MobileSheetActions
        isClearEnabled={!!selectedServiceDomainId}
        onClear={onClear}
        onConfirm={onBack}
        confirmActionText="Confirmă"
      />
    </Box>
  );
};

export default MobileServiceStep;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: 1,
  },
  scrollArea: {
    px: 2.5,
    pt: 1,
    pb: 3,
    overflowY: "auto",
    flex: 1,
    minHeight: 0,
  },
};
