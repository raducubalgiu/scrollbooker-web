import { Box, Button, Stack } from "@mui/material";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import React from "react";

type BusinessDomainsTabsProps = {
  isExpanded: boolean;
  isMapVisible: boolean;
  onOpenFilters: () => void;
  onToggleMap: () => void;
};

const BusinessDomainsTabs = ({
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
        justifyContent="space-between"
        sx={{ mt: 2.5 }}
      >
        <Stack flexDirection="row" alignItems="center" gap={1}>
          <Button
            variant="contained"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Toate
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Beauty
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Medical
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            disableElevation
            sx={{ py: 1.5, px: 3 }}
          >
            Auto
          </Button>
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
