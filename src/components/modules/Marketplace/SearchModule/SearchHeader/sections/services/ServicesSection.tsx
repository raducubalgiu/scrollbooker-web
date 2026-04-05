import {
  Box,
  Breadcrumbs,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Service } from "@/ts/models/nomenclatures/service/Service";
import { useCustomQuery } from "@/hooks/useHttp";
import { find } from "lodash";

type ServicesSectionProps = {
  selectedServiceDomainId: number;
  selectedServiceId: number | null;
  onClose: () => void;
  onSelectServiceId: (serviceId: number | null) => void;
};

const ServicesSection = ({
  selectedServiceDomainId,
  selectedServiceId,
  onClose,
  onSelectServiceId,
}: ServicesSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<Map<number, number>>(
    new Map()
  );

  const { data: services, isLoading } = useCustomQuery<Service[]>({
    key: ["services-by-service-domain", !!selectedServiceDomainId],
    url: `/api/nomenclatures/service-domains/${selectedServiceDomainId}/services`,
    options: { enabled: !!selectedServiceDomainId },
  });

  const serviceFilters =
    find(services, (s) => s.id === selectedServiceId)?.filters || [];

  useEffect(() => {
    setActiveFilters(new Map());
  }, [selectedServiceId]);

  const handleFilterChange = (filterId: number, subFilterId: number) => {
    setActiveFilters((prev) => {
      const next = new Map(prev);
      next.set(filterId, subFilterId);
      return next;
    });
  };

  const allServices = [
    {
      id: 0,
      name: "Toate serviciile",
      filters: [],
    },
    ...(services || []),
  ];

  return (
    <Box sx={{ minWidth: 700, minHeight: 500 }}>
      <Stack flexDirection="row" alignItems="center" gap={1} sx={{ mb: 1.5 }}>
        <IconButton size="large" onClick={onClose}>
          <ArrowBackIcon fontSize="medium" />
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography sx={{ color: "text.primary", fontWeight: 500 }}>
            Par si Barba
          </Typography>
          <Typography sx={{ color: "text.primary" }} fontWeight={700}>
            Selectează serviciul
          </Typography>
        </Breadcrumbs>
      </Stack>

      <FormControl fullWidth sx={{ mb: 2 }} size="medium">
        <Select
          labelId="service-select-label"
          value={selectedServiceId === null ? 0 : selectedServiceId}
          label="Serviciu"
          displayEmpty
          disabled={isLoading}
          onChange={(e) => {
            const val = Number(e.target.value);
            onSelectServiceId(val === 0 ? null : val);
          }}
          renderValue={(selected) => {
            if (selected === 0) {
              return (
                <Typography color="text.secondary">Toate Serviciile</Typography>
              );
            }
            return allServices.find((s) => s.id === selected)?.name;
          }}
          sx={{ borderRadius: "12px" }}
        >
          <MenuItem value={0}>
            <em>Toate serviciile</em>
          </MenuItem>

          {!isLoading &&
            services?.map((s) => (
              <MenuItem key={s.id} value={s.id}>
                {s.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectedServiceId && serviceFilters.length > 0 && (
        <Box
          sx={{
            bgcolor: "background.default",
            p: 2.5,
            borderRadius: 5,
          }}
        >
          <Typography color="text.secondary" fontWeight={600} mb={3}>
            Filtre
          </Typography>
          <Stack flexDirection="row" gap={2} flexWrap="wrap">
            {serviceFilters.map((f) => (
              <FormControl fullWidth key={f.id}>
                <InputLabel
                  id={`service-select-label-${f.id}`}
                  sx={{
                    color: "text.secondary",
                    "&.Mui-focused": { color: "primary.main" },
                  }}
                >
                  {f.name}
                </InputLabel>
                <Select
                  size="medium"
                  labelId={`service-select-label-${f.id}`}
                  value={activeFilters.get(f.id) ?? ""}
                  label={f.name}
                  disabled={isLoading}
                  onChange={(e) =>
                    handleFilterChange(f.id, Number(e.target.value))
                  }
                  sx={{
                    backgroundColor: "background.paper",
                    borderRadius: "12px",
                    "& .MuiSelect-select": {
                      backgroundColor: "background.paper",
                      borderRadius: "12px",
                    },
                  }}
                >
                  {f?.sub_filters?.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default memo(ServicesSection);
