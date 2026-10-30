"use client";

import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Modal from "@/components/core/Modal/Modal";
import CalendarColorPicker from "@/components/cutomized/CalendarColorPicker/CalendarColorPicker";
import { CalendarColorEnum } from "@/ts/enums/CalendarColorEnum";

type CalendarColorPickerModalProps = {
  open: boolean;
  title: string;
  value: CalendarColorEnum | null;
  isSaving: boolean;
  onSave: (color: CalendarColorEnum | null) => void;
  onClose: () => void;
};

const CalendarColorPickerModal = ({
  open,
  title,
  value,
  isSaving,
  onSave,
  onClose,
}: CalendarColorPickerModalProps) => {
  const [pendingColor, setPendingColor] = useState<CalendarColorEnum | null>(value);

  useEffect(() => {
    if (open) setPendingColor(value);
  }, [open, value]);

  return (
    <Modal
      open={open}
      handleClose={onClose}
      title={title}
      maxWidth="xs"
      fullWidth
      dividers={false}
      customFooter={
        <Button
          fullWidth
          variant="contained"
          disableElevation
          loading={isSaving}
          disabled={isSaving}
          onClick={() => onSave(pendingColor)}
        >
          Salvează
        </Button>
      }
    >
      <Box sx={{ px: { xs: 2, lg: 0 }, pb: 2 }}>
        <CalendarColorPicker value={pendingColor} onChange={setPendingColor} />
      </Box>
    </Modal>
  );
};

export default CalendarColorPickerModal;
