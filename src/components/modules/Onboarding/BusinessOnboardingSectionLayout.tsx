import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

type BusinessOnboardingSectionLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
  isDisabled: boolean;
};

const BusinessOnboardingSectionLayout = ({
  title,
  description,
  children,
  onClick,
  isLoading,
  isDisabled,
}: BusinessOnboardingSectionLayoutProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={{ my: "auto" }}>
          <Stack spacing={1} mb={2.5}>
            <Typography variant="h4" fontWeight={700}>
              {title}
            </Typography>

            <Typography color="text.secondary">{description}</Typography>
          </Stack>

          {children}
        </Box>
      </Box>

      <Box sx={styles.buttonContainer}>
        <Button
          variant="contained"
          size="large"
          loading={isLoading}
          disabled={isDisabled}
          onClick={onClick}
          disableElevation
          sx={{ px: 6, py: 1.5, fontWeight: 700 }}
        >
          Salvează și continuă
        </Button>
      </Box>
    </Box>
  );
};

export default BusinessOnboardingSectionLayout;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    overflowY: "auto",
    px: { xs: 2, md: 8 },
    py: { xs: 4, md: 6 },
    "&::-webkit-scrollbar": { width: "5px" },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "divider",
      borderRadius: "10px",
    },
  },
  buttonContainer: {
    p: 3,
    px: { xs: 3, md: 8 },
    borderTop: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
    display: "flex",
    justifyContent: "flex-end",
  },
};
