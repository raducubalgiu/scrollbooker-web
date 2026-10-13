import {
  Box,
  Breadcrumbs,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useGetServicesByServiceDomain } from "@/controllers/nomenclature/service.controller";
import { useGetFiltersByService } from "@/controllers/nomenclature/filter.controller";
import ServiceFiltersPanel from "./ServiceFiltersPanel";

const ALL_SERVICES_ID = 0;

type ServicesSectionProps = {
  selectedServiceDomainId: number;
  selectedServiceDomainName: string;
  selectedServiceId: number | null;
  selectedSubFilterIds: number[];
  onClose: () => void;
  onSelectServiceId: (serviceId: number | null) => void;
  onSelectSubFilterIds: (subFilterIds: number[]) => void;
};

const ServicesSection = ({
  selectedServiceDomainId,
  selectedServiceDomainName,
  selectedServiceId,
  selectedSubFilterIds,
  onClose,
  onSelectServiceId,
  onSelectSubFilterIds,
}: ServicesSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<Map<number, number>>(
    new Map()
  );

  const { data: services, isLoading: isLoadingServices } =
    useGetServicesByServiceDomain({ serviceDomainId: selectedServiceDomainId });

  const { data: serviceFilters, isLoading: isLoadingFilters } =
    useGetFiltersByService({
      serviceId: String(selectedServiceId),
      isEnabled: !!selectedServiceId,
    });

  const previousServiceIdRef = useRef(selectedServiceId);
  const hasSeededFiltersRef = useRef(false);

  useEffect(() => {
    if (previousServiceIdRef.current === selectedServiceId) return;
    previousServiceIdRef.current = selectedServiceId;
    hasSeededFiltersRef.current = false;
    setActiveFilters(new Map());
    onSelectSubFilterIds([]);
  }, [selectedServiceId, onSelectSubFilterIds]);

  useEffect(() => {
    if (hasSeededFiltersRef.current) return;
    if (!serviceFilters || selectedSubFilterIds.length === 0) return;
    hasSeededFiltersRef.current = true;

    const seeded = new Map<number, number>();
    serviceFilters.forEach((filter) => {
      const matchingSubFilter = filter.sub_filters.find((subFilter) =>
        selectedSubFilterIds.includes(subFilter.id)
      );
      if (matchingSubFilter) seeded.set(filter.id, matchingSubFilter.id);
    });
    setActiveFilters(seeded);
  }, [serviceFilters, selectedSubFilterIds]);

  const handleFilterChange = (filterId: number, subFilterId: number) => {
    const next = new Map(activeFilters).set(filterId, subFilterId);
    setActiveFilters(next);
    onSelectSubFilterIds(Array.from(next.values()));
  };

  const handleServiceChange = (value: number) => {
    onSelectServiceId(value === ALL_SERVICES_ID ? null : value);
  };

  const selectedServiceName = services?.find(
    (service) => service.id === selectedServiceId
  )?.name;

  return (
    <Box sx={{ minWidth: { xs: "auto", md: 700 }, minHeight: 500 }}>
      <Stack flexDirection="row" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
        <IconButton size="large" onClick={onClose}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
            {selectedServiceDomainName}
          </Typography>
          <Typography sx={{ color: "text.primary" }} fontWeight={700}>
            Selectează serviciul
          </Typography>
        </Breadcrumbs>
      </Stack>

      <FormControl fullWidth sx={{ mb: 2 }} size="medium">
        <Select
          labelId="service-select-label"
          value={selectedServiceId ?? ALL_SERVICES_ID}
          label="Serviciu"
          displayEmpty
          disabled={isLoadingServices}
          onChange={(e) => handleServiceChange(Number(e.target.value))}
          renderValue={() =>
            selectedServiceId === null ? (
              <Typography color="text.secondary">Toate Serviciile</Typography>
            ) : (
              selectedServiceName
            )
          }
          sx={{ borderRadius: "12px" }}
          MenuProps={{ disableScrollLock: true }}
        >
          <MenuItem value={ALL_SERVICES_ID}>
            <em>Toate serviciile</em>
          </MenuItem>

          {!isLoadingServices &&
            services?.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedServiceId && (
        <ServiceFiltersPanel
          filters={serviceFilters ?? []}
          activeFilters={activeFilters}
          disabled={isLoadingFilters}
          onFilterChange={handleFilterChange}
        />
      )}
    </Box>
  );
};

export default memo(ServicesSection);
