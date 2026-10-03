import { Box } from "@mui/material";
import React from "react";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import Accordion from "@/components/core/Accordion/Accordion";
import SelectedServiceItem from "./SelectedServiceItem";

type SelectedServicesListProps = {
  serviceDomains: SelectedServiceDomainWithServices[] | undefined;
  selectedServices: Set<number>;
  onToggleService: (serviceId: number) => void;
};

const SelectedServicesList = ({
  serviceDomains,
  selectedServices,
  onToggleService,
}: SelectedServicesListProps) => {
  return (
    <Box>
      {serviceDomains?.map((domain) => (
        <Accordion
          title={domain.name}
          key={domain.id}
          sx={{ mb: 1, boxShadow: "none" }}
        >
          {domain.services.map((service) => (
            <SelectedServiceItem
              key={service.id}
              service={service}
              isSelected={selectedServices.has(service.id)}
              onSetSelected={onToggleService}
            />
          ))}
        </Accordion>
      ))}
    </Box>
  );
};

export default SelectedServicesList;
