import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";
import ServiceFilterSelect from "./ServiceFilterSelect";

type ServiceFiltersPanelProps = {
  filters: Filter[];
  activeFilters: Map<number, number>;
  disabled: boolean;
  onFilterChange: (filterId: number, subFilterId: number) => void;
};

const ServiceFiltersPanel = ({
  filters,
  activeFilters,
  disabled,
  onFilterChange,
}: ServiceFiltersPanelProps) => {
  if (filters.length === 0) return null;

  return (
    <Box sx={{ bgcolor: "background.paper", p: 2.5, borderRadius: 5 }}>
      <Typography color="text.secondary" fontWeight={600} mb={3}>
        Filtre
      </Typography>

      <Stack flexDirection="row" gap={2} flexWrap="wrap">
        {filters.map((filter) => (
          <ServiceFilterSelect
            key={filter.id}
            filter={filter}
            value={activeFilters.get(filter.id) ?? ""}
            disabled={disabled}
            onChange={(subFilterId) => onFilterChange(filter.id, subFilterId)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ServiceFiltersPanel;
