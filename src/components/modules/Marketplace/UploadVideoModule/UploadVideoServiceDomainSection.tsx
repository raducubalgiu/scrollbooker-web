"use client";

import React from "react";
import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useGetMySelectedServices } from "@/controllers/nomenclature/service.controller";

type UploadVideoServiceDomainSectionProps = {
  selectedServiceDomainId: number | null;
  onSelect: (serviceDomainId: number | null) => void;
};

const UploadVideoServiceDomainSection = ({
  selectedServiceDomainId,
  onSelect,
}: UploadVideoServiceDomainSectionProps) => {
  const { data: session } = useSession();

  const { data: domains, isLoading } = useGetMySelectedServices({
    businessId: String(session?.business_id),
  });

  const selectedDomains = domains ?? [];

  return (
    <Box>
      <Stack>
        <Typography fontWeight={700}>Categorii</Typography>

        <Typography variant="caption" color="text.secondary" mb={1.5}>
          Care categorie se potrivește cel mai bine postării tale?
        </Typography>
      </Stack>

      {isLoading ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              width={90}
              height={32}
              sx={{ borderRadius: 4 }}
            />
          ))}
        </Stack>
      ) : (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {selectedDomains.map((domain) => {
            const isSelected = selectedServiceDomainId === domain.id;

            return (
              <Chip
                key={domain.id}
                label={domain.name}
                onClick={() => onSelect(isSelected ? null : domain.id)}
                sx={[styles.chip, isSelected && styles.chipSelected]}
              />
            );
          })}
        </Stack>
      )}
    </Box>
  );
};

export default UploadVideoServiceDomainSection;

const styles = {
  chip: {
    fontWeight: 600,
    bgcolor: "action.selected",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
  },
  chipSelected: {
    bgcolor: "primary.main",
    color: "common.white",
    borderColor: "primary.main",
  },
} as const;
