import { Box, Button, Stack } from "@mui/material";
import React from "react";

const ReviewsTab = () => {
  return (
    <Box p={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Button
          variant="contained"
          disableElevation
          sx={{ textTransform: "none" }}
          color="primary"
        >
          Scrise
        </Button>
        <Button
          //variant="contained"
          disableElevation
          sx={{ textTransform: "none" }}
          color="inherit"
        >
          Video
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewsTab;
