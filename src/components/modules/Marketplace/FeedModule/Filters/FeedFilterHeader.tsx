import React from "react";
import { Stack, Typography } from "@mui/material";
import AppLogo from "@/components/core/Logo/AppLogo";

const FeedFilterHeader = () => {
  return (
    <Stack spacing={1.5} sx={styles.container}>
      <AppLogo height={30} />
      <Typography sx={styles.subtitle}>
        Alege ce vrei sa vezi in feed-ul tau
      </Typography>
    </Stack>
  );
};

export default FeedFilterHeader;

const styles = {
  container: { flexShrink: 1, minWidth: 0 },
  subtitle: { color: "text.secondary", fontSize: 18 },
} as const;
