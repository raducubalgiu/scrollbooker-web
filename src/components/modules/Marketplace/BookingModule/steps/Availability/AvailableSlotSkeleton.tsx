import { Skeleton, Stack } from "@mui/material";
import React from "react";

// Container-ul oglindește exact AvailableSlot.tsx (padding/margin/border
// identice), ca skeleton-ul să nu rămână dezaliniat dacă dimensiunile
// reale ale slotului se mai schimbă.
const AvailableSlotSkeleton = () => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      sx={{
        p: { xs: 2, md: 3 },
        border: 1.5,
        borderColor: "divider",
        borderRadius: 2.5,
        mb: { xs: 1.5, md: 2.5 },
      }}
    >
      <Skeleton variant="rounded" width={60} height={24} />
    </Stack>
  );
};

export default AvailableSlotSkeleton;
