"use client";

import NextLink from "next/link";
import { Box, Button, Typography } from "@mui/material";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import { AppRoutes } from "@/utils/routes";

export default function UserProfileNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "70vh",
        px: 2.5,
        gap: 1.5,
      }}
    >
      <PersonOffOutlinedIcon sx={{ fontSize: 56, color: "text.secondary" }} />
      <Typography variant="h5" fontWeight={700}>
        Acest cont nu este disponibil
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
        Este posibil ca link-ul să fie greșit sau contul să nu mai fie activ.
      </Typography>
      <Button
        component={NextLink}
        href={AppRoutes.home()}
        variant="contained"
        disableElevation
        sx={{ mt: 1.5 }}
      >
        Înapoi la pagina principală
      </Button>
    </Box>
  );
}
