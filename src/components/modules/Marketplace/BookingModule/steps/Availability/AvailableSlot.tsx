import { lighten, Stack, Theme, Typography } from "@mui/material";
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
    transition: "all 0.2s ease",
    "&:hover": {
      bgcolor:
        theme.palette.mode === "dark"
          ? lighten(theme.palette.background.default, 0.1)
          : lighten(theme.palette.background.default, 0.2),
    },
  }),
};
