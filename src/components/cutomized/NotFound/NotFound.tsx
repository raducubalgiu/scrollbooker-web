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
  compact?: boolean;
};

const NotFound = ({
  title,
  description,
  icon,
  action,
  sx = {},
  compact = false,
}: NotFoundProps) => {
  const iconSize = compact ? 55 : { xs: 55, lg: 80 };
  const iconFontSize = compact ? 28 : { xs: 28, lg: 40 };
  const titleFontSize = compact ? 18 : { xs: 18, lg: 22 };
  const descriptionFontSize = compact ? 14 : { xs: 14, lg: 15 };

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
            width: iconSize,
            height: iconSize,
            "& svg": {
              fontSize: iconFontSize,
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
              fontSize: titleFontSize,
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
                fontSize: descriptionFontSize,
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
