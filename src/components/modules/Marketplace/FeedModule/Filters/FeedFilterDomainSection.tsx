"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import FeedFilterServiceChip from "./FeedFilterServiceChip";
import FeedFilterCountBadge from "./FeedFilterCountBadge";

type FeedFilterDomainSectionProps = {
  domain: ServiceDomain;
  selectedServiceIds: Set<number>;
  onToggleService: (serviceId: number) => void;
};

const FeedFilterDomainSection = ({
  domain,
  selectedServiceIds,
  onToggleService,
}: FeedFilterDomainSectionProps) => {
  if (domain.services.length === 0) return null;

  const selectedCount = domain.services.filter((service) =>
    selectedServiceIds.has(service.id)
  ).length;

  return (
    <Stack spacing={2.5} mb={2.5}>
      <Stack direction="row" alignItems="center" spacing={1.25}>
        {domain.thumbnail_url && (
          <Box sx={styles.thumbnail}>
            <Image
              src={domain.thumbnail_url}
              alt={domain.name}
              fill
              sizes="32px"
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}

        <Typography variant="body1" fontWeight={600} sx={styles.domainName}>
          {domain.name}
        </Typography>

        {selectedCount > 0 && <FeedFilterCountBadge count={selectedCount} />}
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1.25}>
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

export default FeedFilterDomainSection;

const styles = {
  domainName: { color: "text.primary" },
  thumbnail: {
    position: "relative",
    width: 32,
    height: 32,
    borderRadius: 1.5,
    overflow: "hidden",
    flexShrink: 0,
    bgcolor: "action.hover",
  },
} as const;
