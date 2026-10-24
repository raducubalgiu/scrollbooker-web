"use client";

import React from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { GenderTypeEnum } from "@/ts/enums/GenderTypeEnum";

type UploadVideoTargetGenderSectionProps = {
  value: GenderTypeEnum;
  onChange: (gender: GenderTypeEnum) => void;
};

const OPTIONS: { value: GenderTypeEnum; label: string }[] = [
  { value: GenderTypeEnum.OTHER, label: "Toți" },
  { value: GenderTypeEnum.FEMALE, label: "Femei" },
  { value: GenderTypeEnum.MALE, label: "Bărbați" },
];

const UploadVideoTargetGenderSection = ({
  value,
  onChange,
}: UploadVideoTargetGenderSectionProps) => {
  return (
    <Box>
      <Stack>
        <Typography fontWeight={700}>Cui i se adresează</Typography>

        <Typography variant="caption" color="text.secondary" mb={1.5}>
          Cu i se adresează această postare?
        </Typography>
      </Stack>

      <Stack direction="row" flexWrap="wrap" gap={1}>
        {OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <Chip
              key={option.value}
              label={option.label}
              onClick={() => onChange(option.value)}
              sx={[styles.chip, isSelected && styles.chipSelected]}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default UploadVideoTargetGenderSection;

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
