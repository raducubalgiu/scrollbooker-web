"use client";

import { AppRoutes, useAppNavigation } from "@/utils/routes";
import { Box, Button, Container, Typography } from "@mui/material";

export default function NotFound() {
  const { navigateTo } = useAppNavigation();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" fontWeight={700}>
          404
        </Typography>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Ups! Pagina nu a fost găsită.
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Ne pare rău, dar pagina pe care o cauți nu există sau a fost mutată.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigateTo(AppRoutes.home())}
          disableElevation
        >
          Înapoi la pagina principală
        </Button>
      </Box>
    </Container>
  );
}
