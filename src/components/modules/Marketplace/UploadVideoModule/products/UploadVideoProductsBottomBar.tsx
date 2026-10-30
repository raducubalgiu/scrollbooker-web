import React from "react";
import { Button, Stack, Typography } from "@mui/material";

const MAX_SELECTED_PRODUCTS = 5;

type UploadVideoProductsBottomBarProps = {
  selectedCount: number;
  onReset: () => void;
  onConfirm: () => void;
};

const UploadVideoProductsBottomBar = ({
  selectedCount,
  onReset,
  onConfirm,
}: UploadVideoProductsBottomBarProps) => {
  const disabled = selectedCount === 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ width: "100%", mt: 2.5 }}
    >
      <Typography variant="caption" color="text.secondary">
        {selectedCount}/{MAX_SELECTED_PRODUCTS} servicii selectate
      </Typography>

      <Stack direction="row" gap={1.5}>
        <Button
          variant="outlined"
          color="secondary"
          disabled={disabled}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          disableElevation
          disabled={disabled}
          onClick={onConfirm}
        >
          Adaugă{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </Button>
      </Stack>
    </Stack>
  );
};

export default UploadVideoProductsBottomBar;
