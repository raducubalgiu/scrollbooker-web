"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";

type PlaceholderActionBoxProps = {
  description: string;
  icon?: React.ReactNode;
  isError?: boolean;
  errorMessage?: string;
  onClick?: () => void;
};

export default function PlaceholderActionBox({
  description,
  icon,
  isError = false,
  errorMessage = "",
  onClick,
}: PlaceholderActionBoxProps) {
  return (
    <Box>
      <Box
        component="button"
        type="button"
        onClick={onClick}
        disabled={!onClick}
        sx={[styles.box, isError && styles.boxError]}
      >
        <Stack spacing={1.5} alignItems="center">
          <Box sx={{ color: isError ? "error.main" : "text.primary" }}>
            {icon ?? <AddRoundedIcon />}
          </Box>
          <Typography
            variant="body2"
            fontWeight={500}
            textAlign="center"
            sx={{ color: isError ? "error.main" : "text.primary" }}
          >
            {description}
          </Typography>
        </Stack>
      </Box>

      {isError && errorMessage && (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 16, color: "error.main" }} />
          <Typography variant="caption" color="error.main">
            {errorMessage}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}

const styles = {
  box: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 3,
    py: 4,
    borderRadius: 2,
    border: "1.5px dashed",
    borderColor: "divider",
    bgcolor: "action.hover",
    cursor: "pointer",
    appearance: "none",
    font: "inherit",
    transition: "all 0.15s ease",
    "&:hover": {
      borderColor: "text.secondary",
    },
    "&:disabled": {
      cursor: "default",
    },
  },
  boxError: {
    borderColor: "error.main",
  },
};
