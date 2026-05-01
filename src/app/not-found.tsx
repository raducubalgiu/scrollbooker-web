"use client";

import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

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
          onClick={() => router.push("/")}
          disableElevation
        >
          Înapoi la pagina principală
        </Button>
      </Box>
    </Container>
  );
}
