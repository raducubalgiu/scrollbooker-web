import React from "react";
import { alpha, Box, Button, Stack, Typography, useTheme } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

type SelectedItemStatusRowProps = {
  hasOffering: boolean;
  onRemove: () => void;
};

const SelectedItemStatusRow = ({
  hasOffering,
  onRemove,
}: SelectedItemStatusRowProps) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3}>
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: hasOffering ? "success.main" : "error.main",
            boxShadow: `0 0 0 4px ${hasOffering ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1)}`,
          }}
        />
        <Typography
          fontWeight={600}
          color={hasOffering ? "success.main" : "error.main"}
          fontSize={15}
        >
          {hasOffering
            ? "Disponibil la acest specialist"
            : "Nu oferă acest serviciu"}
        </Typography>
      </Stack>

      {!hasOffering && (
        <Button
          color="error"
          variant="text"
          startIcon={<DeleteOutlineOutlinedIcon />}
          onClick={onRemove}
          sx={{ fontWeight: 700, textTransform: "none" }}
        >
          Elimină
        </Button>
      )}
    </Stack>
  );
};

export default SelectedItemStatusRow;
