import { Box, Button, Stack } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import React from "react";

type BusinessDomainsTabsProps = {
  areFiltersActive: boolean;
  isExpanded: boolean;
  isMapVisible: boolean;
  onOpenFilters: (() => void) | undefined;
  onToggleMap: (() => void) | undefined;
};

const BusinessDomainsTabs = ({
  areFiltersActive,
  isExpanded,
  isMapVisible,
  onOpenFilters,
  onToggleMap,
}: BusinessDomainsTabsProps) => {
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
        justifyContent="flex-end"
        sx={{ mt: 2.5 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
          gap={1}
        >
          <Button
            variant="outlined"
            color={areFiltersActive ? "primary" : "neutral"}
            size="large"
            disableElevation
            startIcon={<TuneOutlinedIcon />}
            onClick={onOpenFilters}
          >
            Filtre
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            size="large"
            disableElevation
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
