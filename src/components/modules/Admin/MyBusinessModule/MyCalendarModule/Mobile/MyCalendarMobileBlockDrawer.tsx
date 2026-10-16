"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import {
  BLOCK_REASON_LABELS,
  BLOCK_REASON_OPTIONS,
  MyCalendarBlockReasonEnum,
} from "./myCalendarBlockReasonEnum";

const MIN_LENGTH = 3;
const MAX_LENGTH = 50;

type MyCalendarMobileBlockDrawerProps = {
  open: boolean;
  dayLabel: string;
  selectedSlots: Set<string>;
  isSaving: boolean;
  onConfirm: (message: string) => void;
  onClose: () => void;
};

const MyCalendarMobileBlockDrawer = ({
  open,
  dayLabel,
  selectedSlots,
  isSaving,
  onConfirm,
  onClose,
}: MyCalendarMobileBlockDrawerProps) => {
  const [message, setMessage] = useState("");
  const [selectedReason, setSelectedReason] = useState<MyCalendarBlockReasonEnum>(
    MyCalendarBlockReasonEnum.OTHER
  );

  const isOtherReason = selectedReason === MyCalendarBlockReasonEnum.OTHER;
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

  const title =
    selectedSlots.size > 1 ? "Blochează sloturile selectate" : "Blochează slotul";

  const sortedSlots = Array.from(selectedSlots).sort();

  const handleConfirm = () => {
    const finalMessage = isOtherReason
      ? trimmedMessage
      : BLOCK_REASON_LABELS[selectedReason];
    onConfirm(finalMessage);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5 }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />

      <Box sx={{ overflowY: "auto", px: 2, py: 2, flex: 1 }}>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {dayLabel}
        </Typography>

        <Box sx={styles.pillsRow}>
          {sortedSlots.map((raw) => (
            <Chip
              key={raw}
              icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
              label={dayjs(raw).format("HH:mm")}
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
                onClick={() => {
                  if (isSaving) return;
                  setSelectedReason(reason);
                  if (reason !== MyCalendarBlockReasonEnum.OTHER) setMessage("");
                }}
                sx={{
                  ...styles.reasonChip,
                  bgcolor: isSelected ? "primary.light" : "transparent",
                  color: isSelected ? "primary.main" : "text.primary",
                  borderColor: isSelected ? "transparent" : "divider",
                }}
                variant={isSelected ? "filled" : "outlined"}
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
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
              {message.length} / {MAX_LENGTH}
            </Typography>
            {messageError && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
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
          disabled={!isButtonEnabled}
          loading={isSaving}
          onClick={handleConfirm}
          sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}
        >
          Blochează
        </Button>
      </Box>
    </Drawer>
  );
};

export default MyCalendarMobileBlockDrawer;

const styles = {
  paper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
  },
  pillsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.75,
    mb: 2.5,
  },
  pill: {
    bgcolor: "action.hover",
  },
  reasonsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  reasonChip: {
    fontWeight: 500,
  },
} as const;
