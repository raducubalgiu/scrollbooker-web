import { IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

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
      mb={{ xs: 0, md: 3 }}
      mt={1}
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <CalendarMonthIcon />
        <Typography variant="h6" fontWeight={500}>
          {activeMonth}
        </Typography>
      </Stack>
      <Stack flexDirection="row" gap={1}>
        <IconButton
          onClick={onNavigatePrev}
          sx={styles.navButton}
          disabled={isPrevDisabled}
        >
          <ChevronLeftIcon sx={styles.navIcon} />
        </IconButton>
        <IconButton
          onClick={onNavigateNext}
          sx={styles.navButton}
          disabled={isNextDisabled}
        >
          <ChevronRightIcon sx={styles.navIcon} />
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
    p: { xs: 1, md: 2.5 },
  },
  navIcon: {
    fontSize: { xs: 18, md: 24 },
  },
};
