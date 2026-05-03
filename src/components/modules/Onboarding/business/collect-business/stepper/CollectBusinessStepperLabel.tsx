import { Box, Typography } from "@mui/material";
import React from "react";

type CollectBusinessStepperLabelProps = {
  currentIndex: number;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
};

const CollectBusinessStepperLabel = ({
  currentIndex,
  label,
  isActive,
  isCompleted,
}: CollectBusinessStepperLabelProps) => {
  return (
    <Box
      sx={{
        flex: 1,
        textAlign:
          currentIndex === 1 ? "center" : currentIndex === 2 ? "right" : "left",
      }}
    >
      <Typography
        sx={{
          fontWeight: isActive ? 700 : 500,
          color: isActive
            ? "text.primary"
            : isCompleted
              ? "text.primary"
              : "text.disabled",
          transition: "all 0.3s ease",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default CollectBusinessStepperLabel;
