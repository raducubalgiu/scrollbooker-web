import { Box, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import Image from "next/image";
import React, { memo } from "react";

type ServiceDomainSectionProps = {
  selectedServiceDomains: {
    id: number;
    name: string;
    url: string;
    thumbnail_url: string;
  }[];
  onSelectServiceDomain: (serviceDomainId: number) => void;
};

const ServiceDomainsSection = ({
  selectedServiceDomains,
  onSelectServiceDomain,
}: ServiceDomainSectionProps) => {
  return (
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
        {isEmpty(selectedServiceDomains) && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ gridColumn: "1 / -1" }}
          >
            Selectează o categorie pentru a vedea serviciile disponibile.
          </Typography>
        )}

        {!isEmpty(selectedServiceDomains) &&
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
              onClick={() => onSelectServiceDomain(serviceDomain.id)}
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
          ))}
      </Box>
    </Box>
  );
};

export default memo(ServiceDomainsSection);
