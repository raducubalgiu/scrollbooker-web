import React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Modal from "@/components/core/Modal/Modal";
import { CalendarDurationOption } from "./calendarDurationOptions";

type CalendarDurationPickerModalProps = {
  open: boolean;
  title: string;
  options: CalendarDurationOption[];
  selectedMinutes: number;
  isSaving: boolean;
  onSave: (minutes: number) => void;
  onClose: () => void;
};

const CalendarDurationPickerModal = ({
  open,
  title,
  options,
  selectedMinutes,
  isSaving,
  onSave,
  onClose,
}: CalendarDurationPickerModalProps) => {
  return (
    <Modal open={open} handleClose={onClose} title={title} maxWidth="xs" fullWidth>
      <List sx={{ py: 0 }}>
        {options.map((option) => {
          const isSelected = option.minutes === selectedMinutes;

          return (
            <ListItemButton
              key={option.minutes}
              selected={isSelected}
              disabled={isSaving}
              onClick={() => onSave(option.minutes)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText primary={option.label} />
              {isSaving && isSelected ? (
                <CircularProgress size={20} />
              ) : (
                isSelected && <CheckRoundedIcon color="primary" />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Modal>
  );
};

export default CalendarDurationPickerModal;
