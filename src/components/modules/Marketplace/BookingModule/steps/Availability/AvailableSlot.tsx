import { alpha, Stack, Theme, Typography } from "@mui/material";
import React from "react";

type AvailableSlotProps = {
  time: string;
};

const AvailableSlot = ({ time }: AvailableSlotProps) => {
  return (
    <Stack flexDirection="row" sx={styles.container}>
      <Typography variant="h6" fontWeight={600}>
        {time}
      </Typography>
    </Stack>
  );
};

export default AvailableSlot;

const styles = {
  container: (theme: Theme) => ({
    p: 3,
    border: 1.5,
    borderColor: "divider",
    borderRadius: 2.5,
    mb: 2.5,
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.text.primary + "90",
      backgroundColor: alpha(theme.palette.divider, 0),
    },
  }),
};
