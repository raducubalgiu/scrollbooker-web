import { Box, Stack, Typography } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import React from "react";

type NotFoundProps = {
  resource: string;
};

const ErrorMessage = ({ resource }: NotFoundProps) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ mt: 4, width: "100%" }}
    >
      <Box
        sx={{
          bgcolor: "background.default",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
        }}
      >
        <ReportProblemOutlinedIcon color="error" sx={{ fontSize: 50 }} />
      </Box>
      <Typography variant="h4" color="text.primary" fontWeight={600}>
        A apărut o eroare
      </Typography>
      <Typography variant="h6" color="text.secondary">
        Din păcate lista de {resource} nu a putut fi afișată"
      </Typography>
    </Stack>
  );
};

export default ErrorMessage;
