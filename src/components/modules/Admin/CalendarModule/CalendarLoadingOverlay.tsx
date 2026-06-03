import { alpha, Box, Theme } from "@mui/material";
import React from "react";
import MapLoadingIndicator from "../../Marketplace/SearchModule/SearchLoadingIndicator";

const CalendarLoadingOverlay = () => {
  return (
    <Box sx={styles.container}>
      <MapLoadingIndicator show={true} />
    </Box>
  );
};

export default CalendarLoadingOverlay;

const styles = {
  container: (theme: Theme) => ({
    gridColumn: "1 / -1",
    gridRow: "1 / -1",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "center",
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: "blur(1px)",
    transition: "opacity 0.2s ease",
  }),
};
