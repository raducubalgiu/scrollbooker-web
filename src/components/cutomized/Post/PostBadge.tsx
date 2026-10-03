import { Box, Typography } from "@mui/material";
import React from "react";

type PostBadgeProps = {
  label: string;
  bgcolor: string;
  color: string;
};

const PostBadge = ({ label, bgcolor, color }: PostBadgeProps) => (
  <Box sx={{ ...styles.badge, bgcolor }}>
    <Typography
      variant="caption"
      fontWeight={600}
      sx={{ ...styles.text, color }}
    >
      {label}
    </Typography>
  </Box>
);

export default PostBadge;

const styles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
    p: { xs: 0.7, md: 1 },
    borderRadius: 1.5,
  },
  text: {
    lineHeight: 1,
  },
};
