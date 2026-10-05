import { Box, Typography } from "@mui/material";
import React from "react";

type FeedTabProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

const FeedTab = ({ label, isActive, onClick }: FeedTabProps) => {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={styles.tabButton}
    >
      <Typography
        sx={{
          fontWeight: isActive ? 700 : 600,
          color: isActive ? "common.white" : "rgba(255,255,255,0.7)",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          transition: "color 0.2s ease",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>

      <Box sx={styles.underlineTrack}>
        <Box
          sx={{
            ...styles.underline,
            opacity: isActive ? 1 : 0,
            transform: `scaleX(${isActive ? 1 : 0})`,
          }}
        />
      </Box>
    </Box>
  );
};

export default FeedTab;

const styles = {
  tabButton: {
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0.75,
  },
  underlineTrack: {
    width: 18,
    height: 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  underline: {
    width: 18,
    height: 2.5,
    borderRadius: 50,
    backgroundColor: "common.white",
    boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  },
} as const;
