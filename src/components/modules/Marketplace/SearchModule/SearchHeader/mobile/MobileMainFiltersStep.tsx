import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useMemo } from "react";
import ServiceDomainsSection from "../sections/services/ServiceDomainsSection";
import RecentSearchesSection from "../sections/services/RecentSearchesSection";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { RecentSearch } from "@/ts/models/search/RecentSearch";

type MobileMainFiltersStepProps = {
  businessDomains: BusinessDomain[];
  recentSearches: RecentSearch[];
  onSelectServiceDomain: (serviceDomainId: number) => void;
  onSelectRecentSearch: (search: RecentSearch) => void;
  onClose: () => void;
};

const MobileMainFiltersStep = ({
  businessDomains,
  recentSearches,
  onSelectServiceDomain,
  onSelectRecentSearch,
  onClose,
}: MobileMainFiltersStepProps) => {
  const serviceDomains = useMemo(
    () => businessDomains.flatMap((domain) => domain.service_domains),
    [businessDomains]
  );

  return (
    <Box sx={styles.container}>
      <Stack direction="row" justifyContent="flex-end" sx={{ p: 1 }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Typography variant="h5" fontWeight={700} sx={{ px: 2.5, pb: 2 }}>
        Servicii
      </Typography>

      <Box sx={styles.scrollArea}>
        {recentSearches.length > 0 && (
          <RecentSearchesSection
            recentSearches={recentSearches}
            onSelectRecentSearch={onSelectRecentSearch}
          />
        )}

        <Typography fontWeight={700} mb={1.5}>
          Categorii
        </Typography>
        <ServiceDomainsSection
          selectedServiceDomains={serviceDomains}
          onSelectServiceDomain={onSelectServiceDomain}
        />
      </Box>
    </Box>
  );
};

export default MobileMainFiltersStep;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    flex: 1,
  },
  scrollArea: {
    px: 2.5,
    pb: 3,
    overflowY: "auto",
    flex: 1,
    minHeight: 0,
  },
};
