"use client";

import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function UnderConstruction() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 3,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            borderRadius: "50%",
            padding: 3,
            marginBottom: 3,
            display: "inline-flex",
            animation: "pulse 2s infinite ease-in-out",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(0.95)",
                boxShadow: "0 0 0 0 rgba(255, 152, 0, 0.4)",
              },
              "70%": {
                transform: "scale(1)",
                boxShadow: "0 0 0 15px rgba(255, 152, 0, 0)",
              },
              "100%": {
                transform: "scale(0.95)",
                boxShadow: "0 0 0 0 rgba(255, 152, 0, 0)",
              },
            },
          }}
        >
          <ConstructionIcon sx={{ fontSize: 60, color: "#ff9800" }} />
        </Box>

        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "3rem" } }}
        >
          Site-ul este în construcție
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ marginBottom: 4, maxWidth: "500px", fontWeight: 400 }}
        >
          Lucrăm de zor la ultimele detalii pentru a-ți oferi o experiență
          excelentă. Revenim în câteva zile!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => window.location.reload()}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            padding: "10px 24px",
            boxShadow: 3,
          }}
        >
          Verifică din nou
        </Button>
      </Box>
    </Container>
  );
}
