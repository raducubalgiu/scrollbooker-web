import React from "react";
import { Box, Typography } from "@mui/material";

type FeedFilterCountBadgeProps = {
  count: number;
};

const FeedFilterCountBadge = ({ count }: FeedFilterCountBadgeProps) => (
  <Box sx={styles.badge}>
    <Typography variant="caption" fontWeight={700} sx={styles.label}>
      {count}
    </Typography>
  </Box>
);

export default FeedFilterCountBadge;

const styles = {
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: "50%",
    bgcolor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 0.5,
  },
  label: { color: "primary.contrastText" },
} as const;
