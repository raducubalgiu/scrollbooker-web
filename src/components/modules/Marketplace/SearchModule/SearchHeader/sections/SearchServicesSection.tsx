import { Box, Typography, Button } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MVP_BUSINESS_DOMAINS } from "@/utils/mvp-hardcoded/mvp-business-domains";
import ServiceDomainsSection from "./services/ServiceDomainsSection";
import ServicesSection from "./services/ServicesSection";
import {
  SearchHeaderActionsType,
  SearchHeaderStateType,
} from "../search-header-types";

type SearchServicesSectionProps = {
  state: SearchHeaderStateType;
  actions: SearchHeaderActionsType;
};

const SearchServicesSection = ({
  state,
  actions,
}: SearchServicesSectionProps) => {
  const {
    selectedBusinessDomainId,
    selectedServiceDomainId,
    selectedServiceId,
  } = state;
  const { onSetBusinessDomainId, onSetServiceDomainId, onSetServiceId } =
    actions;

  const bDomains = useMemo(
    () => [
      {
        id: null,
        name: "Toate",
        short_name: "Toate",
        active: false,
        service_domains: [],
      },
      ...MVP_BUSINESS_DOMAINS,
    ],
    []
  );

  const [displayServices, setDisplayServices] = useState(false);

  useEffect(() => {
    setDisplayServices(!!selectedServiceDomainId);
  }, [selectedServiceDomainId]);

  const selectedServiceDomains = useMemo(() => {
    return (
      bDomains.find((d) => d.id === selectedBusinessDomainId)
        ?.service_domains || []
    );
  }, [selectedBusinessDomainId, bDomains]);

  const handleSelectServiceDomain = useCallback((serviceDomainId: number) => {
    setDisplayServices(true);
    onSetServiceDomainId(serviceDomainId);
  }, []);

  const handleSelectService = useCallback(
    (serviceId: number | null) => onSetServiceId(serviceId),
    [onSetServiceId]
  );

  const handleCloseServiceSection = useCallback(() => {
    setDisplayServices(false);
    onSetServiceDomainId(null);
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography
        variant="h6"
        fontWeight={700}
        key={displayServices ? "filtru" : "cautare"}
        sx={styles.title}
      >
        {!displayServices ? "Ce serviciu cauți?" : "Filtrare avansată"}
      </Typography>

      <Box sx={{ mt: 3, mb: 2 }}>
        {bDomains.map((d) => {
          const isSelected = d.id === selectedBusinessDomainId;

          return (
            <Button
              key={d.id}
              variant={isSelected ? "contained" : "outlined"}
              color={isSelected ? "primary" : "secondary"}
              size="large"
              disableElevation
              sx={{ py: 1.5, px: 3, mr: 1 }}
              onClick={() => onSetBusinessDomainId(d.id)}
            >
              {d.short_name}
            </Button>
          );
        })}
      </Box>

      {!displayServices && (
        <ServiceDomainsSection
          selectedServiceDomains={selectedServiceDomains}
          onSelectServiceDomain={handleSelectServiceDomain}
        />
      )}

      {displayServices && selectedServiceDomainId && (
        <ServicesSection
          selectedServiceDomainId={selectedServiceDomainId}
          selectedServiceId={selectedServiceId}
          onClose={handleCloseServiceSection}
          onSelectServiceId={handleSelectService}
        />
      )}
    </Box>
  );
};

export default SearchServicesSection;

const styles = {
  container: { minWidth: 700, minHeight: 500 },
  title: {
    animation: "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    "@keyframes slideIn": {
      "0%": {
        opacity: 0,
        transform: "translateY(10px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },
};
