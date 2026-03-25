import { Box, Typography, CircularProgress, Button } from "@mui/material";
import React from "react";
import { BusinessDomainsResponse } from "@/ts/models/nomenclatures/businessDomain/BusinessDomainType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const ALL_B_DOMAINS = [
//   {
//     id: 1,
//     name: "Saloane de înfrumusețare, frizerii, spa-uri, saloane de unghii și grooming personal",
//     short_name: "Beauty",
//     active: true,
//     created_at: "2025-07-04T16:58:02.018593Z",
//     updated_at: "2025-07-04T16:58:02.018593Z",
//     service_domains: [
//       {
//         id: 26,
//         name: "Păr și barbă",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/26/card_6b4421eda943416ebb952e601f932d62.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/26/thumb_a6a9156f2cba43a39efd9fc75cff4e16.jpg",
//       },
//       {
//         id: 27,
//         name: "Sprâncene și gene",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/27/card_526b27b327214ced835b10549b6d1a58.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/27/thumb_b1f9bc59634148bfad5b80de233f951a.jpg",
//       },
//       {
//         id: 29,
//         name: "Unghii",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/29/card_9eb42d096eeb473ab30356b239d2a9a6.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/29/thumb_a96c528a360149bdbfe4c5697f8b3f7b.jpg",
//       },
//       {
//         id: 28,
//         name: "Cosmetică facială",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/28/card_f8c471361e60472f9990c7eded8d4a04.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/28/thumb_35ff7a0df04b4fcda165d35361639415.jpg",
//       },
//       {
//         id: 64,
//         name: "Epilare",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/64/card_6bdc7ed136d041f186641932a69ecb5a.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/64/thumb_364efcda1c8f4ec28a9ef02e917e0bcb.jpg",
//       },
//       {
//         id: 65,
//         name: "Remodelare corporală",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/65/card_a27f3b9b8c974b87ab928e9deb9c239d.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/65/thumb_c8ee85bcb1464f668b47c9be816563c9.jpg",
//       },
//       {
//         id: 63,
//         name: "Chirurgie estetică",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/63/card_b70f5438ffd742b18d0967e53ce3a618.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/63/thumb_deaa699e011f4dd9947e245d10f45e20.jpg",
//       },
//       {
//         id: 31,
//         name: "Masaj",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/31/card_02886fbdeab24e6a8b27f1face535f21.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/31/thumb_64b48e8fff044e9f90d0316cb9419a2e.jpg",
//       },
//     ],
//     business_types: [
//       {
//         id: 1,
//         name: "Frizerie",
//         plural: "Frizerii",
//       },
//       {
//         id: 2,
//         name: "Salon de înfrumusețare",
//         plural: "Saloane de înfrumusețare",
//       },
//       {
//         id: 27,
//         name: "Salon de unghii",
//         plural: "Saloane de unghii",
//       },
//       {
//         id: 31,
//         name: "Studio de sprâcene & gene",
//         plural: "Studio-uri de sprâncene & gene",
//       },
//       {
//         id: 30,
//         name: "Centru de remodelare corporală",
//         plural: "Centre de remodelare corporală",
//       },
//       {
//         id: 29,
//         name: "Salon de masaj & spa",
//         plural: "Saloane de masaj & spa",
//       },
//       {
//         id: 47,
//         name: "Clinică estetică",
//         plural: "Clinici estetice",
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Clinici medicale, cabinete, centre de analiză, diagnostic și tratamente terapeutice",
//     short_name: "Medical",
//     active: true,
//     created_at: "2025-07-16T18:58:54.816405Z",
//     updated_at: "2025-07-16T18:58:54.816405Z",
//     service_domains: [
//       {
//         id: 1,
//         name: "Stomatologie",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/1/card_0c9d1bb446c848258dff4c70d37e3c82.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/1/thumb_4f6d41dccf6e4be7815f35153939093f.jpg",
//       },
//       {
//         id: 25,
//         name: "Medicină veterinară",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/25/card_5153e3b1a93c475da2ae1b0cb9a99bb2.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/25/thumb_8514df0446cf470288599fd18f4e67ac.jpg",
//       },
//       {
//         id: 62,
//         name: "Psihologie",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/62/card_6d39e55db92b464f91c3048da1f7eef8.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/62/thumb_3f63c0ee7a9b414e9c78e2e60816e162.jpg",
//       },
//       {
//         id: 66,
//         name: "Recuperare medicală",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/66/card_dcf7581c3ae246b088f8c8d79c77e455.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/66/thumb_7e644e44b2cf46bdba66dcfba53f37af.jpg",
//       },
//     ],
//     business_types: [
//       {
//         id: 6,
//         name: "Cabinet Stomatologic",
//         plural: "Cabinete Stomatologice",
//       },
//       {
//         id: 7,
//         name: "Cabinet veterinar",
//         plural: "Cabinete veterinare",
//       },
//       {
//         id: 46,
//         name: "Cabinet psihologic",
//         plural: "Cabinet psihologic",
//       },
//       {
//         id: 48,
//         name: "Clinică de recuperare și terapie",
//         plural: "Clinici de recuperare și terapie",
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Service-uri auto, ateliere de reparații, stații ITP și centre de întreținere auto",
//     short_name: "Auto",
//     active: true,
//     created_at: "2025-07-16T19:00:00.982347Z",
//     updated_at: "2025-07-16T19:00:00.982347Z",
//     service_domains: [
//       {
//         id: 58,
//         name: "ITP",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/58/card_bcd81eddee074ac799319f3824145798.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/58/thumb_de3a9458fa784ea498e0973700229900.jpg",
//       },
//       {
//         id: 57,
//         name: "Detailing auto",
//         url: "https://media.scrollbooker.ro/nomenclatures/service-domains/57/card_c34670baf32640dda6bd3a0cbcf1c77c.jpg",
//         thumbnail_url:
//           "https://media.scrollbooker.ro/nomenclatures/service-domains/57/thumb_7608a22ec8304f208375a0a8601fd773.jpg",
//       },
//     ],
//     business_types: [
//       {
//         id: 4,
//         name: "Service auto",
//         plural: "Service-uri auto",
//       },
//       {
//         id: 5,
//         name: "Stație ITP",
//         plural: "Stații ITP",
//       },
//       {
//         id: 44,
//         name: "Centru detailing auto",
//         plural: "Centre detailing auto",
//       },
//     ],
//   },
// ];

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

  const bDomains = [
    {
      id: 0,
      name: "Toate",
      short_name: "Toate",
      active: false,
      service_domains: [],
    },
    ...domains,
  ];

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Ce serviciu cauți?
      </Typography>
      {bDomains.map((d, idx) => (
        <Button
          key={d.id}
          variant={idx === 0 ? "contained" : "outlined"}
          color={idx === 0 ? "primary" : "secondary"}
          size="large"
          disableElevation
          sx={{ py: 1.5, px: 3, mr: 1 }}
          onClick={() => {}}
        >
          {d.short_name}
        </Button>
        // <Tab
        //   key={domain.id}
        //   label={domain.short_name}
        //   value={idx}
        //   sx={{
        //     borderRadius: 3,
        //     fontWeight: 600,
        //     minHeight: 36,
        //     minWidth: 80,
        //     px: 2,
        //     mx: 0.5,
        //   }}
        ///>
      ))}
      {/* <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 2 }}
      >
        {bDomains.map((domain, idx) => (
          <Button key={domain.id} onClick={() => setSelectedTab(idx)}>
            {domain.short_name}
          </Button>
          // <Tab
          //   key={domain.id}
          //   label={domain.short_name}
          //   value={idx}
          //   sx={{
          //     borderRadius: 3,
          //     fontWeight: 600,
          //     minHeight: 36,
          //     minWidth: 80,
          //     px: 2,
          //     mx: 0.5,
          //   }}
          ///>
        ))}
      </Tabs> */}
      {/* Service domains will be handled later */}
    </Box>
  );
};

export default SearchServicesSection;
