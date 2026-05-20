import { alpha, Box, Typography } from "@mui/material";
import React from "react";

const CancelPolicy = () => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
        border: "1px solid",
        borderColor: (theme) => alpha(theme.palette.info.main, 0.1),
      }}
    >
      <Typography
        variant="subtitle2"
        color="info.main"
        fontWeight={700}
        mb={0.5}
      >
        Politica de anulare
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Anularea gratuită este disponibilă cu până la 24 de ore înainte de ora
        programată. Ulterior, se pot aplica taxe conform regulamentului
        afacerii.
      </Typography>
    </Box>
  );
};

export default CancelPolicy;
