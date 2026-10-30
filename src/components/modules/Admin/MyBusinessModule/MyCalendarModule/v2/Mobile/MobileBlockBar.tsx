"use client";

import React from "react";
import { Box, Button, Divider } from "@mui/material";

type MobileBlockBarProps = {
  isEnabled: boolean;
  onCancel: () => void;
  onBlockConfirm: () => void;
};

const MobileBlockBar = ({
  isEnabled,
  onCancel,
  onBlockConfirm,
}: MobileBlockBarProps) => {
  return (
    <Box sx={styles.container}>
      <Divider />
      <Box sx={styles.row}>
        <Button
          variant="outlined"
          color="secondary"
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
          disableElevation
        >
          Blochează
        </Button>
      </Box>
    </Box>
  );
};

export default MobileBlockBar;

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
  },
} as const;
