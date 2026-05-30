"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import Link from "next/link";

export default function UnauthorizedPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: isDark ? "background.default" : "grey.50",
        background: isDark
          ? "radial-gradient(circle, #1e1e24 0%, #121214 100%)"
          : "radial-gradient(circle, #ffffff 0%, #f8f9fa 100%)",
        px: 3,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            p: { xs: 4, sm: 6 },
            borderRadius: 5,
            bgcolor: "background.paper",
            boxShadow: isDark
              ? "0 20px 40px rgba(0,0,0,0.5)"
              : "0 20px 50px rgba(0,0,0,0.06)",
            border: "1px solid",
            borderColor: "divider",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 150,
              height: 150,
              borderRadius: "50%",
              bgcolor: "error.main",
              opacity: isDark ? 0.05 : 0.03,
              pointerEvents: "none",
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 88,
              height: 88,
              borderRadius: 4,
              bgcolor: isDark ? "rgba(211, 47, 47, 0.15)" : "error.lighter",
              color: "error.main",
              mb: 4,
              boxShadow: "0 8px 16px rgba(211, 47, 47, 0.1)",
            }}
          >
            <PrivacyTipOutlinedIcon sx={{ fontSize: 48 }} />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            fontWeight="800"
            gutterBottom
            sx={{ letterSpacing: "-0.5px" }}
          >
            Acces interzis
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: "380px", mb: 5, lineHeight: 1.6 }}
          >
            Nu ai permisiunile necesare pentru a vizualiza această pagină. Dacă
            consideri că este o eroare, contactează administratorul.
          </Typography>

          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            size="large"
            disableElevation
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: "700",
              textTransform: "none",
              fontSize: "0.95rem",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              },
            }}
          >
            Mergi la pagina de start
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
