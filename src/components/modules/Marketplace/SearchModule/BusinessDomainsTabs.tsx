import { Box, Button, Stack } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import React from "react";
import {
  BusinessDomainsResponse,
  BusinessDomainType,
} from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { MVP_BUSINESS_DOMAINS } from "@/utils/mvp-hardcoded/mvp-business-domains";

type BusinessDomainsTabsProps = {
  isExpanded: boolean;
  isMapVisible: boolean;
  onOpenFilters: () => void;
  onToggleMap: () => void;
  businessDomains?: BusinessDomainsResponse;
  selectedBusinessDomain: BusinessDomainType | null;
  onSetSelectedBusinessDomain: (domain: BusinessDomainType) => void;
};

const BusinessDomainsTabs = ({
  isExpanded,
  isMapVisible,
  onOpenFilters,
  onToggleMap,
  selectedBusinessDomain,
  onSetSelectedBusinessDomain,
}: BusinessDomainsTabsProps) => {
  const businessDomains = [
    {
      id: 0,
      name: "Toate",
      short_name: "Toate",
      active: false,
      service_domains: [],
    },
    ...MVP_BUSINESS_DOMAINS,
  ];

  return (
    <Box
      sx={{
        transition: "opacity 0.2s ease",
        opacity: isExpanded ? 0 : 1,
        pointerEvents: isExpanded ? "none" : "auto",
      }}
    >
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 2.5 }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          {businessDomains.map((d) => {
            const isSelected = d.id === selectedBusinessDomain?.id;

            return (
              <Button
                key={d.id}
                variant={isSelected ? "contained" : "outlined"}
                color={isSelected ? "primary" : "secondary"}
                size="large"
                disableElevation
                sx={{ py: 1.5, px: 3 }}
                onClick={() => onSetSelectedBusinessDomain(d)}
              >
                {d.short_name}
              </Button>
            );
          })}
        </Stack>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
            startIcon={<TuneOutlinedIcon />}
            onClick={onOpenFilters}
          >
            Filtre
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
            startIcon={<MapOutlinedIcon />}
            onClick={onToggleMap}
          >
            {isMapVisible ? "Ascunde harta" : "Arată harta"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default BusinessDomainsTabs;
