import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          textAlign: "center",
          py: 8,
        }}
      >
        <Typography variant="h4">Accesul interzis</Typography>
        <Typography color="text.secondary">
          Nu ai permisiunea necesară pentru a accesa această pagină.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/">Înapoi la pagina principală</Link>
        </Box>
      </Box>
    </Container>
  );
}
