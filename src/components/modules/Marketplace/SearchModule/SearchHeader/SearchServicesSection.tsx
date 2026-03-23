import { Box, Chip, Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { BusinessDomainsResponse } from "@/ts/models/nomenclatures/businessDomain/BusinessDomainType";
import { useCustomQuery } from "@/hooks/useHttp";

type Props = {
  businessDomains?: BusinessDomainsResponse | null;
};

const STALE_TIME = 24 * 60 * 60 * 1000; // 24 hours

const SearchServicesSection = ({ businessDomains }: Props) => {
  const { data, isLoading, isError } = useCustomQuery<BusinessDomainsResponse>({
    key: ["businessDomains"],
    url: "/api/nomenclatures/business-domains",
    options: {
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
      // if server already provided data, use it as initialData to avoid client refetch
      initialData: businessDomains ?? undefined,
    },
  });

  const domains = React.useMemo<BusinessDomainsResponse>(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    // support common envelope shapes: { results: [...] } or { data: [...] }
    if (Array.isArray((data as any).results)) return (data as any).results;
    if (Array.isArray((data as any).data)) return (data as any).data;
    // unexpected shape
    // eslint-disable-next-line no-console
    console.warn(
      "SearchServicesSection: unexpected businessDomains shape",
      data
    );
    return [];
  }, [data]);

  if (isLoading && domains.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box>
        <Typography color="error">Eroare la încărcarea serviciilor</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Ce serviciu cauți?
      </Typography>

      {[
        {
          id: 0,
          name: "Toate",
          short_name: "Toate",
          active: false,
          service_domains: [],
        },
        ...domains,
      ].map((domain) => (
        <Box key={domain.id} mb={2}>
          <Typography variant="subtitle2" fontWeight={600} mb={1}>
            {domain.name}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {(domain.service_domains || []).map((sd) => (
              <Chip
                key={sd.id}
                label={sd.name}
                clickable
                variant="outlined"
                sx={{ borderRadius: 3, fontWeight: 500 }}
              />
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default SearchServicesSection;
