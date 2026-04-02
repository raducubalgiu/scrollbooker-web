import { Box, Divider, Stack, Button } from "@mui/material";
import React, { memo } from "react";

const InstantBookingTab = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.listContainer}>Services here</Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" gap={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disableElevation
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: 17,
              py: 1.5,
            }}
          >
            Rezervă acum
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            disableElevation
            size="large"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: 17,
              py: 1.5,
            }}
          >
            Toate produsele
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default memo(InstantBookingTab);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    p: 3,
    scrollBarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};
