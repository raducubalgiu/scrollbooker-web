import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Breadcrumbs,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useMemo, useState } from "react";
import { MVP_BUSINESS_DOMAINS } from "@/utils/mvp-hardcoded/mvp-business-domains";
import Image from "next/image";
import { useCustomQuery } from "@/hooks/useHttp";
import { Service } from "@/ts/models/nomenclatures/service/Service";

type SearchServicesSectionProps = {
  selectedBusinessDomainId: number | null;
  onSetBusinessDomainId: (id: number | null) => void;
  selectedServiceDomainId: number | null;
  onSetServiceDomainId: (id: number | null) => void;
  selectedServiceId: number | null;
  onSetServiceId: (id: number | null) => void;
};

const SearchServicesSection = ({
  selectedBusinessDomainId,
  onSetBusinessDomainId,
  selectedServiceDomainId,
  onSetServiceDomainId,
  selectedServiceId,
  onSetServiceId,
}: SearchServicesSectionProps) => {
  const { data: services, isLoading } = useCustomQuery<Service[]>({
    key: ["services-by-service-domain", !!selectedServiceDomainId],
    url: `/api/nomenclatures/service-domains/${selectedServiceDomainId}/services`,
    options: {
      enabled: !!selectedServiceDomainId,
    },
  });

  const bDomains = useMemo(
    () => [
      {
        id: null,
        name: "Toate",
        short_name: "Toate",
        active: false,
        service_domains: [],
      },
      ...MVP_BUSINESS_DOMAINS,
    ],
    []
  );

  const [displayServices, setDisplayServices] = useState(false);

  useEffect(() => {
    if (selectedServiceDomainId) {
      onSetServiceDomainId(selectedServiceDomainId);
      setDisplayServices(true);
    } else {
      onSetServiceDomainId(null);
      setDisplayServices(false);
    }
  }, [selectedServiceDomainId]);

  const selectedServiceDomains = useMemo(() => {
    return (
      bDomains.find((d) => d.id === selectedBusinessDomainId)
        ?.service_domains || []
    );
  }, [selectedBusinessDomainId, bDomains]);

  return (
    <Box sx={{ minWidth: 700, minHeight: 500 }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Ce serviciu cauți?
      </Typography>

      <Box sx={{ mb: 2 }}>
        {bDomains.map((d) => {
          const isSelected = d.id === selectedBusinessDomainId;

          return (
            <Button
              key={d.id}
              variant={isSelected ? "contained" : "outlined"}
              color={isSelected ? "primary" : "secondary"}
              size="large"
              disableElevation
              sx={{ py: 1.5, px: 3, mr: 1, mb: 1 }}
              onClick={() => onSetBusinessDomainId(d.id)}
            >
              {d.short_name}
            </Button>
          );
        })}
      </Box>

      {!displayServices ? (
        <Box sx={{ minWidth: 700, minHeight: 500 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {selectedServiceDomains.length === 0 ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ gridColumn: "1 / -1" }}
              >
                Selectează o categorie pentru a vedea serviciile disponibile.
              </Typography>
            ) : (
              selectedServiceDomains.map((serviceDomain) => (
                <Box
                  key={serviceDomain.id}
                  sx={{
                    textAlign: "center",
                    p: 1,
                    cursor: "pointer",
                    transition: "box-shadow 0.2s",
                    "&:hover": {
                      backgroundColor: "background.default",
                      borderRadius: 2,
                    },
                  }}
                  onClick={() => {
                    setDisplayServices(true);
                    onSetServiceDomainId(serviceDomain.id);
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 150,
                    }}
                  >
                    <Image
                      src={serviceDomain.thumbnail_url}
                      alt={serviceDomain.name}
                      fill
                      sizes="(max-width: 600px) 100vw, 50vw"
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                    />
                  </Box>
                  <Typography fontWeight={700} mt={1.5}>
                    {serviceDomain.name}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ minWidth: 700, minHeight: 500 }}>
          <Stack flexDirection="row" alignItems="center" mb={1.5} gap={1}>
            <IconButton
              size="large"
              onClick={() => {
                setDisplayServices(false);
                onSetServiceDomainId(null);
              }}
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb">
              <Typography sx={{ color: "text.primary" }}>
                Par si Barba
              </Typography>
              <Typography sx={{ color: "text.primary" }} fontWeight={600}>
                Selecteaza serviciul
              </Typography>
            </Breadcrumbs>
          </Stack>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="service-select-label">Serviciu</InputLabel>
            <Select
              labelId="service-select-label"
              value={selectedServiceId ?? ""}
              label="Serviciu"
              disabled={isLoading}
              onChange={(e) => onSetServiceId(Number(e.target.value))}
            >
              {!isLoading &&
                services?.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    {s.name}
                  </MenuItem>
                ))}
              {!isLoading && services?.length === 0 && (
                <MenuItem>
                  Nu exista servicii disponibile pentru acest domeniu
                </MenuItem>
              )}
            </Select>
          </FormControl>
          {selectedServiceId && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                (Aici vor fi afișate filtrele pentru serviciul selectat)
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchServicesSection;
