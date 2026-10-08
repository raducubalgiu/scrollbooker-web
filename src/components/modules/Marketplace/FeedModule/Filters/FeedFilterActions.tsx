import React from "react";
import { Button, Stack } from "@mui/material";

type FeedFilterActionsProps = {
  isClearEnabled: boolean;
  selectedCount: number;
  onClear: () => void;
  onConfirm: () => void;
};

const FeedFilterActions = ({
  isClearEnabled,
  selectedCount,
  onClear,
  onConfirm,
}: FeedFilterActionsProps) => {
  return (
    <Stack spacing={1.5} sx={styles.container}>
      <Button
        onClick={onClear}
        disabled={!isClearEnabled}
        sx={styles.clearButton}
      >
        Șterge filtrele
      </Button>

      <Button
        fullWidth
        variant="contained"
        onClick={onConfirm}
        sx={styles.confirmButton}
      >
        {selectedCount > 0 ? `Filtrează (${selectedCount})` : "Filtrează"}
      </Button>
    </Stack>
  );
};

export default FeedFilterActions;

const styles = {
  container: { flexShrink: 0, pt: 1 },
  clearButton: {
    alignSelf: "center",
    color: "error.main",
    fontWeight: 700,
    textTransform: "none",
    "&.Mui-disabled": {
      color: "text.disabled",
      opacity: 0.6,
    },
  },
  confirmButton: {
    py: 1.5,
    fontWeight: "bold",
    textTransform: "none",
    borderRadius: 50,
  },
} as const;
