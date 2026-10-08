import { Check } from "@mui/icons-material";
import { Box, Tooltip } from "@mui/material";
import React from "react";

type OfferingToggleProps = {
  isOffering: boolean;
  onToggle: () => void;
};

const OfferingToggle = ({ isOffering, onToggle }: OfferingToggleProps) => {
  return (
    <Tooltip title={isOffering ? "Nu oferă" : "Activează"}>
      <Box
        component="button"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        sx={styles.toggle(isOffering)}
      >
        {isOffering && (
          <Check fontSize="small" sx={{ color: "common.white" }} />
        )}
      </Box>
    </Tooltip>
  );
};

export default OfferingToggle;

const styles = {
  toggle: (checked: boolean) => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    p: 0,
    border: "2px solid",
    borderColor: checked ? "primary.main" : "divider",
    bgcolor: checked ? "primary.main" : "transparent",
    transition: "all 0.15s ease",
  }),
};
