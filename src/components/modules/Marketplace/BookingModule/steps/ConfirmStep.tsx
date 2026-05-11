"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Paper,
  alpha,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const ConfirmStep = () => {
  // Date Dummy - vor fi înlocuite cu datele din state/props
  const appointmentSummary = {
    date: "Luni, 25 Mai 2024",
    time: "14:30 - 15:30",
    specialist: "Radu Ion",
    specialistAvatar: "https://pravatar.cc",
    address: "Strada Șelari, nr. 15, Sector 3, București",
    totalPrice: "240.00",
    totalDuration: "60 min",
  };

  return (
    <Box sx={{ minWidth: 0, pb: 4 }}>
      <Typography
        fontWeight={800}
        fontSize={{ xs: 32, md: 47.5 }}
        mt={3}
        mb={1}
      >
        Verifică detaliile
      </Typography>
      <Typography color="text.secondary" mb={5} fontSize={18}>
        Ești la un pas de a finaliza programarea. Asigură-te că toate datele
        sunt corecte.
      </Typography>

      <Stack spacing={3}>
        {/* CARD: CAND SI UNDE */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: 1.5,
            borderColor: "divider",
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Box sx={styles.iconWrapper}>
                <CalendarTodayOutlinedIcon color="primary" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  Data și Ora
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {appointmentSummary.date} • {appointmentSummary.time}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="center" gap={2}>
              <Box sx={styles.iconWrapper}>
                <FmdGoodOutlinedIcon color="primary" />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  Locație
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {appointmentSummary.address}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        {/* CARD: SPECIALIST */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: 1.5,
            borderColor: "divider",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar
                src={appointmentSummary.specialistAvatar}
                sx={{
                  width: 60,
                  height: 60,
                  border: 1,
                  borderColor: "divider",
                }}
              />
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  Specialistul tău
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {appointmentSummary.specialist}
                </Typography>
              </Box>
            </Stack>
            <PersonOutlineOutlinedIcon
              sx={{ color: "divider", fontSize: 30 }}
            />
          </Stack>
        </Paper>

        {/* INFO EXTRA: POLITICA DE ANULARE */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.05),
            border: "1px solid",
            borderColor: (theme) => alpha(theme.palette.info.main, 0.1),
          }}
        >
          <Typography
            variant="subtitle2"
            color="info.main"
            fontWeight={700}
            mb={0.5}
          >
            Politica de anulare
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Anularea gratuită este disponibilă cu până la 24 de ore înainte de
            ora programată. Ulterior, se pot aplica taxe conform regulamentului
            afacerii.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const styles = {
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 2,
    bgcolor: "background.paper",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 1,
    borderColor: "divider",
  },
};

export default ConfirmStep;
