import React from "react";
import {
  Container,
  Stack,
  Box,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";

type NotFoundProps = {
  title: string;
  description?: string;
  icon: React.ReactElement;
  action?: React.ReactNode;
  sx?: SxProps<Theme>;
};

const NotFound = ({
  title,
  description,
  icon,
  action,
  sx = {},
}: NotFoundProps) => {
  return (
    <Container maxWidth="xs" sx={sx}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        sx={{ mt: 4, width: "100%" }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 55, lg: 80 },
            height: { xs: 55, lg: 80 },
            "& svg": {
              fontSize: { xs: 28, lg: 40 },
              color: "text.primary",
            },
          }}
        >
          {icon}
        </Box>

        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={0.5}
          sx={{ width: "100%" }}
        >
          <Typography
            sx={{
              color: "text.primary",
              fontWeight: 600,
              fontSize: { xs: 18, lg: 22 },
              textAlign: "center",
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              sx={{
                color: "text.secondary",
                textAlign: "center",
                fontSize: { xs: 14, lg: 15 },
              }}
            >
              {description}
            </Typography>
          )}
        </Stack>

        {action && <Box sx={{ mt: 1 }}>{action}</Box>}
      </Stack>
    </Container>
  );
};

export default NotFound;
