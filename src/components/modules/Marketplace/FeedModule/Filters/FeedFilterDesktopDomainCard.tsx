"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import FeedFilterServiceChip from "./FeedFilterServiceChip";
import FeedFilterCountBadge from "./FeedFilterCountBadge";

type FeedFilterDesktopDomainCardProps = {
  domain: ServiceDomain;
  selectedServiceIds: Set<number>;
  onToggleService: (serviceId: number) => void;
};

const FeedFilterDesktopDomainCard = ({
  domain,
  selectedServiceIds,
  onToggleService,
}: FeedFilterDesktopDomainCardProps) => {
  if (domain.services.length === 0) return null;

  const selectedCount = domain.services.filter((service) =>
    selectedServiceIds.has(service.id)
  ).length;

  return (
    <Stack spacing={1.5} sx={styles.card}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {domain.thumbnail_url && (
          <Box sx={styles.thumbnail}>
            <Image
              src={domain.thumbnail_url}
              alt={domain.name}
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}

        <Typography variant="subtitle1" fontWeight={600} sx={styles.domainName}>
          {domain.name}
        </Typography>

        {selectedCount > 0 && <FeedFilterCountBadge count={selectedCount} />}
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {domain.services.map((service) => (
          <FeedFilterServiceChip
            key={service.id}
            label={service.short_name}
            isSelected={selectedServiceIds.has(service.id)}
            onClick={() => onToggleService(service.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default FeedFilterDesktopDomainCard;

const styles = {
  card: {
    p: 2.5,
    borderRadius: 3,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    transition: "border-color 0.15s ease",
    "&:hover": {
      borderColor: "primary.main",
    },
  },
  domainName: { color: "text.primary" },
  thumbnail: {
    position: "relative",
    width: 40,
    height: 40,
    borderRadius: 2,
    overflow: "hidden",
    flexShrink: 0,
    bgcolor: "action.hover",
  },
} as const;
