import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const Specialists = () => {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3}>
        Specialisti
      </Typography>

      <Box>Specialists Content</Box>
    </Box>
  );
};

export default memo(Specialists);
