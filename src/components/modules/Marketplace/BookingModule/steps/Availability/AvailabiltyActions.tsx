import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type AvailabilityActionsProps = {
  activeMonth: string;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
};

const AvailabiltyActions = ({
  activeMonth,
  isPrevDisabled,
  isNextDisabled,
  onNavigatePrev,
  onNavigateNext,
}: AvailabilityActionsProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mt={5}
      mb={3}
    >
      <Typography
        variant="h5"
        fontWeight={800}
        sx={{ textTransform: "capitalize" }}
      >
        {activeMonth}
      </Typography>
      <Stack flexDirection="row" gap={1}>
        <IconButton
          size="large"
          onClick={onNavigatePrev}
          sx={styles.navButton}
          disabled={isPrevDisabled}
        >
          <ChevronLeftIcon fontSize="medium" />
        </IconButton>
        <IconButton
          size="large"
          onClick={onNavigateNext}
          sx={styles.navButton}
          disabled={isNextDisabled}
        >
          <ChevronRightIcon fontSize="medium" />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AvailabiltyActions;

const styles = {
  navButton: {
    border: 1.5,
    borderColor: "divider",
    borderRadius: 50,
    p: 2.5,
  },
};
