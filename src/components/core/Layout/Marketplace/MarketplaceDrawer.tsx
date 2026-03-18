import { Box, Typography } from "@mui/material";
import React from "react";
import MarketplaceSidebar from "./MarketplaceSidebar";

const MarketplaceDrawer = () => {
  return (
    <Box sx={{ p: 2.5 }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        fontWeight={600}
        fontSize={30}
        sx={{ mb: 2.5 }}
      >
        ScrollBooker
      </Typography>
      <MarketplaceSidebar />
    </Box>
  );
};

export default MarketplaceDrawer;
