import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import ServiceDomainsSection from "./services/ServiceDomainsSection";
import ServicesSection from "./services/ServicesSection";
import RecentSearchesSection from "./services/RecentSearchesSection";
import {
  SearchHeaderActionsType,
  SearchHeaderStateType,
} from "../search-header-types";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { RecentSearch } from "@/ts/models/search/RecentSearch";
import { useGetRecentSearches } from "@/controllers/search/search.controller";

type SearchServicesSectionProps = {
  businessDomains: BusinessDomain[];
  state: SearchHeaderStateType;
  actions: SearchHeaderActionsType;
};

const SearchServicesSection = ({
  businessDomains,
  state,
  actions,
}: SearchServicesSectionProps) => {
  const { selectedServiceDomainId, selectedServiceId, selectedSubFilterIds } =
    state;
  const {
    onSetServiceDomainId,
    onSetServiceId,
    onSetSubFilterIds,
    onExecuteSearch,
  } = actions;

  const { status: sessionStatus } = useSession();

  const { data: recentSearches } = useGetRecentSearches({
    isEnabled: sessionStatus === "authenticated",
  });

  const displayServices = !!selectedServiceDomainId;

  const serviceDomains = useMemo(
    () => businessDomains.flatMap((d) => d.service_domains),
    [businessDomains]
  );

  const selectedServiceDomainName = useMemo(
    () =>
      serviceDomains.find((d) => d.id === selectedServiceDomainId)?.name ??
      "",
    [serviceDomains, selectedServiceDomainId]
  );

  const handleSelectServiceDomain = useCallback(
    (serviceDomainId: number) => {
      onSetServiceDomainId(serviceDomainId);
    },
    [onSetServiceDomainId]
  );

  const handleSelectService = useCallback(
    (serviceId: number | null) => onSetServiceId(serviceId),
    [onSetServiceId]
  );

  const handleCloseServiceSection = useCallback(() => {
    onSetServiceDomainId(null);
  }, [onSetServiceDomainId]);

  const handleSelectRecentSearch = useCallback(
    (search: RecentSearch) => {
      onExecuteSearch({
        selectedServiceDomainId: search.service_domain.id,
        selectedServiceId: search.services[0]?.id ?? null,
        selectedSubFilterIds: [],
      });
    },
    [onExecuteSearch]
  );

  return (
    <Box sx={styles.container}>
      {!displayServices && (
        <Box sx={{ mt: 3 }}>
          <RecentSearchesSection
            recentSearches={recentSearches ?? []}
            onSelectRecentSearch={handleSelectRecentSearch}
          />

          <Typography fontWeight={700} mb={1.5}>
            Categorii
          </Typography>
          <ServiceDomainsSection
            selectedServiceDomains={serviceDomains}
            onSelectServiceDomain={handleSelectServiceDomain}
          />
        </Box>
      )}

      {displayServices && selectedServiceDomainId && (
        <ServicesSection
          selectedServiceDomainId={selectedServiceDomainId}
          selectedServiceDomainName={selectedServiceDomainName}
          selectedServiceId={selectedServiceId}
          selectedSubFilterIds={selectedSubFilterIds}
          onClose={handleCloseServiceSection}
          onSelectServiceId={handleSelectService}
          onSelectSubFilterIds={onSetSubFilterIds}
        />
      )}
    </Box>
  );
};

export default SearchServicesSection;

const styles = {
  container: { minWidth: { xs: "auto", md: 700 }, minHeight: 500 },
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
