import { Box, Typography } from "@mui/material";
import React from "react";

const ExploreSidebar = () => {
  return (
    <Box
      sx={{
        ml: 6,
        flex: 1,
        minWidth: 320,
        maxWidth: 600,
        width: "100%",
        height: "100%",
        minHeight: 0,
        border: 1,
        borderColor: "divider",
        borderRadius: 4,
      }}
    >
      <Typography>Sidebar</Typography>
    </Box>
  );
};

export default ExploreSidebar;
