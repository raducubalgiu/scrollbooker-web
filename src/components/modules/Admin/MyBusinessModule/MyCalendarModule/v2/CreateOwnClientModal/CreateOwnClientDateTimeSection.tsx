import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import dayjs from "@/lib/dayjs";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { SelectedSlot } from "./createOwnClientTypes";

type CreateOwnClientDateTimeSectionProps = {
  selectedSlot: SelectedSlot | null;
  disabled: boolean;
  disabledLabel: string;
  hasError?: boolean;
  onOpenSelect: () => void;
  onClearSlot: () => void;
  errorMessage?: string | null;
};

const CreateOwnClientDateTimeSection = ({
  selectedSlot,
  disabled,
  disabledLabel,
  hasError = false,
  onOpenSelect,
  onClearSlot,
  errorMessage = null,
}: CreateOwnClientDateTimeSectionProps) => {
  return (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          3. Data și ora
        </Typography>

        {selectedSlot && (
          <Button
            size="small"
            startIcon={<EditOutlinedIcon />}
            disabled={disabled}
            onClick={onOpenSelect}
          >
            Modifică
          </Button>
        )}
      </Stack>

      {selectedSlot ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={[styles.card, !!errorMessage && styles.cardError]}
        >
          <Avatar sx={styles.icon}>
            <EventOutlinedIcon fontSize="small" />
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontSize={16} fontWeight={600} noWrap sx={styles.dayLabel}>
              {dayjs(selectedSlot.startLocale).format("dddd, D MMMM")}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.2 }}>
              {dayjs(selectedSlot.startLocale).format("HH:mm")} –{" "}
              {dayjs(selectedSlot.endLocale).format("HH:mm")} •{" "}
              {ProductUtils.getDurationText(
                dayjs(selectedSlot.endLocale).diff(dayjs(selectedSlot.startLocale), "minute")
              )}
            </Typography>
          </Box>

          <Tooltip title="Elimină intervalul">
            <IconButton onClick={onClearSlot} color="error" sx={styles.removeButton}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Button
          onClick={onOpenSelect}
          disabled={disabled}
          sx={[styles.trigger, hasError && styles.error]}
          endIcon={!disabled && <ChevronRightIcon color="action" />}
        >
          <EventOutlinedIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
          <Typography color="text.secondary" noWrap sx={{ flex: 1, minWidth: 0 }}>
            {disabled ? disabledLabel : "Alege data și ora"}
          </Typography>
        </Button>
      )}

      {errorMessage && (
        <Stack direction="row" spacing={0.75} alignItems="flex-start">
          <WarningAmberIcon sx={{ fontSize: 18, color: "error.main", mt: 0.1 }} />
          <Typography variant="body2" color="error.main">
            {errorMessage}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default CreateOwnClientDateTimeSection;

const styles = {
  card: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
    px: 2,
    py: 1.5,
  },
  cardError: {
    borderColor: "error.main",
  },
  icon: {
    width: 36,
    height: 36,
    bgcolor: "action.hover",
    color: "text.primary",
  },
  dayLabel: {
    "&::first-letter": { textTransform: "uppercase" },
  },
  removeButton: {
    bgcolor: "background.default",
    flexShrink: 0,
    "&:hover": { bgcolor: "action.hover" },
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    justifyContent: "flex-start",
    textAlign: "left",
    textTransform: "none",
    color: "text.primary",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 1.5,
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
    "& .MuiButton-endIcon": { flexShrink: 0 },
  },
  error: {
    "&, &.Mui-disabled": { borderColor: "error.main" },
  },
};
