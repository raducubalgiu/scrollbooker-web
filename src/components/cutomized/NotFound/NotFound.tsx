import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type NotFoundProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
};

const NotFound = ({ title, description, icon }: NotFoundProps) => {
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
        {icon}
      </Box>
      <Typography variant="h4" color="text.primary" fontWeight={600}>
        {title}
      </Typography>
      {description && (
        <Typography variant="h6" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
  );
};

export default NotFound;
