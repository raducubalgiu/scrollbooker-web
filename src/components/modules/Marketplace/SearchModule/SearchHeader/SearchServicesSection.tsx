import { Box, Chip, Stack, Typography, CircularProgress } from "@mui/material";
import React from "react";
import { BusinessDomainsResponse } from "@/ts/models/nomenclatures/businessDomain/BusinessDomainType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SearchServicesSectionProps = {
  businessDomains?: BusinessDomainsResponse | null | undefined;
};

const STALE_TIME = 24 * 60 * 60 * 1000;

const SearchServicesSection = ({
  businessDomains,
}: SearchServicesSectionProps) => {
  const { data, isLoading, isError } = useQuery<unknown, Error>({
    queryKey: ["businessDomains"],
    queryFn: async () => {
      const res = await axios.get<unknown>(
        "/api/nomenclatures/business-domains"
      );
      return res.data;
    },
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
    initialData: businessDomains ?? undefined,
  });

  const domains = React.useMemo<BusinessDomainsResponse>(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data as BusinessDomainsResponse;

    if (typeof data === "object" && data !== null) {
      const rec = data as Record<string, unknown>;
      const maybeResults = (rec as { results?: unknown }).results;
      if (Array.isArray(maybeResults))
        return maybeResults as BusinessDomainsResponse;
      const maybeData = (rec as { data?: unknown }).data;
      if (Array.isArray(maybeData)) return maybeData as BusinessDomainsResponse;
    }

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
