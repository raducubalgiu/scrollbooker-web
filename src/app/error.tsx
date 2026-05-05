"use client";

import React, { useEffect } from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { Replay, ErrorOutline, Home } from "@mui/icons-material";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error Boundary:", error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              bgcolor: "error.lighter",
              color: "error.main",
              mb: 3,
            }}
          >
            <ErrorOutline sx={{ fontSize: 48 }} />
          </Box>

          <Typography variant="h5" fontWeight="800" gutterBottom>
            Ups! Ceva nu a mers bine
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {error.message === "ACCOUNT_INCOMPLETE"
              ? "Profilul tău de business nu este complet configurat pentru a vedea această pagină."
              : "A apărut o eroare neașteptată la încărcarea datelor. Te rugăm să încerci din nou."}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="contained"
              startIcon={<Replay />}
              onClick={() => reset()} // Încearcă să re-rendereze componenta care a dat eroare
              sx={{ borderRadius: 2, px: 3 }}
            >
              Reîncearcă
            </Button>

            <Button
              component={Link}
              href="/admin/dashboard"
              variant="outlined"
              startIcon={<Home />}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Dashboard
            </Button>
          </Box>

          {process.env.NODE_ENV === "development" && (
            <Typography
              variant="caption"
              display="block"
              sx={{
                mt: 4,
                p: 2,
                bgcolor: "#f5f5f5",
                borderRadius: 1,
                fontFamily: "monospace",
              }}
            >
              Dev Info: {error.digest}
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
