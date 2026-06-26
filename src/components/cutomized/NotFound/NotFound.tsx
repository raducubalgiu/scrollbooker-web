import { Box, Container, Stack, Typography } from "@mui/material";
import React from "react";

type NotFoundProps = {
  title: string;
  description?: string;
  icon: React.ReactNode;
};

const NotFound = ({ title, description, icon }: NotFoundProps) => {
  return (
    <Container maxWidth="xs">
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
            width: { xs: 70, md: 120 },
            height: { xs: 70, md: 120 },
          }}
        >
          {icon}
        </Box>

        <Stack justifyContent="center" alignItems="center" spacing={0.5}>
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 600,
              fontSize: { xs: 18, lg: 25 },
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
                fontSize: { xs: 14, lg: 16 },
              }}
            >
              {description}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default NotFound;
