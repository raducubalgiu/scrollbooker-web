import { Box, Stack } from "@mui/material";
import React from "react";
import { BusinessStep } from "../CollectBusinessStep";
import CollectBusinessStepperProgress from "./CollectBusinessStepperProgress";
import CollectBusinessStepperLabel from "./CollectBusinessStepperLabel";

type CollectBusinessStepperProps = {
  step: BusinessStep;
};

const subStepLabels = ["Tip Business", "Detalii", "Adresă"];

const CollectBusinessStepper = ({ step }: CollectBusinessStepperProps) => {
  return (
    <Box sx={styles.stepperContainer}>
      <Stack direction="row" justifyContent="space-between" mb={1.5}>
        {subStepLabels.map((label, index) => (
          <CollectBusinessStepperLabel
            label={label}
            isActive={index === step}
            isCompleted={index < step}
            currentIndex={index}
          />
        ))}
      </Stack>

      <CollectBusinessStepperProgress step={step} />
    </Box>
  );
};

export default CollectBusinessStepper;

const styles = {
  container: { display: "flex", flexDirection: "column", height: "100%" },
  stepperContainer: {
    px: { xs: 3, md: 8 },
    pt: 6,
    pb: 2.5,
    mx: 20,
    display: { xs: "none", md: "block" },
  },
};
