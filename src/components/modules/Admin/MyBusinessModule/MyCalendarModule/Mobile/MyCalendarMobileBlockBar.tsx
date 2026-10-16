"use client";

import React from "react";
import { Box, Button, Divider } from "@mui/material";

type MyCalendarMobileBlockBarProps = {
  isEnabled: boolean;
  onCancel: () => void;
  onBlockConfirm: () => void;
};

const MyCalendarMobileBlockBar = ({
  isEnabled,
  onCancel,
  onBlockConfirm,
}: MyCalendarMobileBlockBarProps) => {
  return (
    <Box sx={styles.container}>
      <Divider />
      <Box sx={styles.row}>
        <Button
          variant="outlined"
          color="inherit"
          fullWidth
          onClick={onCancel}
          sx={styles.button}
        >
          Anulează
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          disabled={!isEnabled}
          onClick={onBlockConfirm}
          sx={styles.button}
        >
          Blochează
        </Button>
      </Box>
    </Box>
  );
};

export default MyCalendarMobileBlockBar;

const styles = {
  container: {
    bgcolor: "background.default",
  },
  row: {
    display: "flex",
    gap: 1.5,
    p: 2,
  },
  button: {
    textTransform: "none",
    fontWeight: 700,
    borderRadius: 2,
  },
} as const;
