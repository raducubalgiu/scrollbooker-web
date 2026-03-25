import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useMemo, useState } from "react";
import { MVP_BUSINESS_DOMAINS } from "@/utils/mvp-hardcoded/mvp-business-domains";
import { BusinessDomainType } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import Image from "next/image";

type SearchServicesSectionProps = {
  selectedBusinessDomain: BusinessDomainType | null;
  onSetSelectedBusinessDomain: (domain: BusinessDomainType) => void;
};

const SearchServicesSection = ({
  selectedBusinessDomain,
  onSetSelectedBusinessDomain,
}: SearchServicesSectionProps) => {
  const bDomains = useMemo(
    () => [
      {
        id: 0,
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
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const selectedServiceDomains = useMemo(() => {
    return (
      bDomains.find((d) => d.id === selectedBusinessDomain?.id)
        ?.service_domains || []
    );
  }, [selectedBusinessDomain, bDomains]);

  return (
    <Box sx={{ minWidth: 700, minHeight: 500 }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>
        Ce serviciu cauți?
      </Typography>

      <Box sx={{ mb: 2 }}>
        {bDomains.map((d) => {
          const isSelected = d.id === selectedBusinessDomain?.id;

          return (
            <Button
              key={d.id}
              variant={isSelected ? "contained" : "outlined"}
              color={isSelected ? "primary" : "secondary"}
              size="large"
              disableElevation
              sx={{ py: 1.5, px: 3, mr: 1, mb: 1 }}
              onClick={() => onSetSelectedBusinessDomain(d)}
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
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 100,
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
                  <Typography variant="body2" fontWeight={700}>
                    {serviceDomain.name}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ minWidth: 700, minHeight: 500 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton
              size="large"
              onClick={() => {
                setDisplayServices(false);
                setSelectedServiceId("");
              }}
            >
              <ArrowBackIcon fontSize="medium" />
            </IconButton>
            <Typography variant="subtitle1" fontWeight={700} ml={1}>
              Selectează serviciul
            </Typography>
          </Box>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="service-select-label">Serviciu</InputLabel>
            <Select
              labelId="service-select-label"
              value={selectedServiceId}
              label="Serviciu"
              disabled={true}
            >
              <MenuItem>
                Nu exista servicii disponibile pentru acest domeniu
              </MenuItem>
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
