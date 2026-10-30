"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  TextField,
  Theme,
  Typography,
  alpha,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  BLOCK_REASON_LABELS,
  BLOCK_REASON_OPTIONS,
  BlockReasonEnum,
} from "./blockReasonEnum";

const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

export type BlockSlotsContentProps = {
  dayLabel?: string | undefined;
  slotLabels: string[];
  isSaving: boolean;
  onConfirm: (message: string) => void;
};

export const getBlockSlotsTitle = (slotsCount: number) =>
  slotsCount > 1 ? "Blochează sloturile selectate" : "Blochează slotul";

const BlockSlotsContent = ({
  dayLabel,
  slotLabels,
  isSaving,
  onConfirm,
}: BlockSlotsContentProps) => {
  const [message, setMessage] = useState("");
  const [selectedReason, setSelectedReason] =
    useState<BlockReasonEnum>(BlockReasonEnum.OTHER);

  const isOtherReason = selectedReason === BlockReasonEnum.OTHER;
  const trimmedMessage = message.trim();

  const messageError = isOtherReason
    ? trimmedMessage.length === 0
      ? "Acest câmp este obligatoriu"
      : trimmedMessage.length < MIN_LENGTH
        ? `Acest câmp trebuie să aibă ${MIN_LENGTH} caractere`
        : trimmedMessage.length > MAX_LENGTH
          ? `Acest câmp este limitat la ${MAX_LENGTH} caractere`
          : null
    : null;

  const isButtonEnabled = (isOtherReason ? !messageError : true) && !isSaving;

  const handleConfirm = () => {
    const finalMessage = isOtherReason
      ? trimmedMessage
      : BLOCK_REASON_LABELS[selectedReason];
    onConfirm(finalMessage);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.body}>
        {dayLabel && (
          <Typography sx={{ mb: 2, fontWeight: 600 }}>{dayLabel}</Typography>
        )}

        <Box sx={styles.pillsRow}>
          {slotLabels.map((label, index) => (
            <Chip
              key={`${label}-${index}`}
              icon={<AccessTimeIcon />}
              label={label}
              size="small"
              sx={styles.pill}
            />
          ))}
        </Box>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
          Motiv
        </Typography>

        <Box sx={styles.reasonsRow}>
          {BLOCK_REASON_OPTIONS.map((reason) => {
            const isSelected = reason === selectedReason;
            return (
              <Chip
                key={reason}
                label={BLOCK_REASON_LABELS[reason]}
                {...(isSelected && { icon: <CheckIcon /> })}
                variant="outlined"
                onClick={() => {
                  if (isSaving) return;
                  setSelectedReason(reason);
                  if (reason !== BlockReasonEnum.OTHER)
                    setMessage("");
                }}
                sx={isSelected ? styles.reasonSelected : styles.reason}
              />
            );
          })}
        </Box>

        {isOtherReason && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="Adaugă un mesaj ..."
              value={message}
              disabled={isSaving}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "block", textAlign: "right", mt: 0.5 }}
            >
              {message.length} / {MAX_LENGTH}
            </Typography>
            {messageError && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                sx={{ mt: 0.5 }}
              >
                <WarningAmberIcon sx={{ fontSize: 16, color: "error.main" }} />
                <Typography variant="caption" color="error.main">
                  {messageError}
                </Typography>
              </Stack>
            )}
          </Box>
        )}
      </Box>

      <Divider />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          disableElevation
          disabled={!isButtonEnabled}
          loading={isSaving}
          onClick={handleConfirm}
        >
          Blochează
        </Button>
      </Box>
    </Box>
  );
};

export default BlockSlotsContent;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minHeight: 0,
  },
  body: {
    overflowY: "auto",
    px: 2,
    py: 2,
    flex: 1,
  },
  pillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.75,
    mb: 2.5,
  },
  pill: {
    height: 28,
    px: 0.5,
    fontWeight: 700,
    color: "error.main",
    bgcolor: (theme: Theme) => alpha(theme.palette.error.main, 0.08),
    "& .MuiChip-icon": {
      fontSize: 15,
      color: "error.main",
    },
  },
  reasonsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  reason: {
    height: 36,
    px: 0.5,
    fontWeight: 500,
    color: "text.primary",
    borderColor: "divider",
  },
  reasonSelected: {
    height: 36,
    px: 0.5,
    fontWeight: 600,
    color: "primary.main",
    borderColor: "primary.main",
    bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.12),
    "& .MuiChip-icon": {
      fontSize: 18,
      color: "primary.main",
    },
    "&&:hover": {
      bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.18),
    },
  },
} as const;
