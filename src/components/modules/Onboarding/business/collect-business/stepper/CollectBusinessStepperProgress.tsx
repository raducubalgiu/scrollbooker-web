import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { BusinessStep } from "../CollectBusinessStep";

type CollectBusinessStepperProgressProps = {
  step: BusinessStep;
};

const CollectBusinessStepperProgress = ({
  step,
}: CollectBusinessStepperProgressProps) => {
  return (
    <Box sx={{ position: "relative" }}>
      <LinearProgress
        variant="determinate"
        value={((step + 1) / 3) * 100}
        sx={styles.progress}
      />
      <Box sx={styles.bulletContainer}>
        {[0, 1, 2].map((i) => (
          <Box key={i} sx={styles.bullet} />
        ))}
      </Box>
    </Box>
  );
};

export default CollectBusinessStepperProgress;

const styles = {
  progress: {
    height: 6,
    borderRadius: 3,
    bgcolor: "grey.100",
    "& .MuiLinearProgress-bar": {
      borderRadius: 3,
      transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  bulletContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    px: 0.5,
  },
  bullet: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    bgcolor: "white",
    mt: "1px",
    opacity: 0.5,
  },
};
