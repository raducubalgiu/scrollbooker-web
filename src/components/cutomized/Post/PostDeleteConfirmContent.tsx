import { Button, Stack, Typography } from "@mui/material";
import React from "react";

type PostDeleteConfirmContentProps = {
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const PostDeleteConfirmContent = ({
  isLoading,
  onConfirm,
  onCancel,
}: PostDeleteConfirmContentProps) => (
  <Stack spacing={2}>
    <Typography color="text.secondary">
      Ești sigur că dorești să ștergi această postare? Această acțiune este
      ireversibilă.
    </Typography>

    <Stack spacing={1}>
      <Button
        fullWidth
        variant="contained"
        color="error"
        disableElevation
        loading={isLoading}
        disabled={isLoading}
        onClick={onConfirm}
      >
        Șterge
      </Button>

      <Button
        fullWidth
        variant="outlined"
        color="neutral"
        disabled={isLoading}
        onClick={onCancel}
      >
        Anulează
      </Button>
    </Stack>
  </Stack>
);

export default PostDeleteConfirmContent;
