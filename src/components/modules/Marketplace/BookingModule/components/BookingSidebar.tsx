import { alpha, Box, Button, Typography } from "@mui/material";
import React from "react";

const BookingSidebar = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        position: "sticky",
        top: 130,
        height: "calc(100vh - 170px)",
        overflowY: "auto",
        "&::-webkit-scrollbar": { display: "none" },

        bgcolor: "background.paper",
        borderRadius: 8,
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.divider, 0.1),
        p: 6,

        flexDirection: "column",
      }}
    >
      <Typography variant="h4" fontWeight={900} mb={4} letterSpacing="-0.02em">
        Coșul tău
      </Typography>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.6 }}
        >
          Aici vei vedea serviciile selectate. Spațiul generos ajută la
          claritate.
        </Typography>
      </Box>

      <Box
        sx={{
          pt: 2,
          mt: "auto",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Button
          variant="contained"
          size="large"
          disableElevation
          fullWidth
          sx={{ p: 1.75, fontSize: 19, fontWeight: 600 }}
        >
          Continua
        </Button>
      </Box>
    </Box>
  );
};

export default BookingSidebar;
