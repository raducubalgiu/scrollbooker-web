"use client";

import React from "react";
import { Box, Stack, Typography, Divider, Paper, alpha } from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import dayjs from "dayjs";
import CancelPolicy from "./CancelPolicy";

type ConfirmStepProps = {
  selectedTimeSlot: AvailableTimeSlot | null;
  address: string;
};

const ConfirmStep = ({ selectedTimeSlot, address }: ConfirmStepProps) => {
  const date = dayjs(selectedTimeSlot?.start_date_locale).format(
    "dddd, D MMMM YYYY"
  );
  const time = dayjs(selectedTimeSlot?.start_date_locale).format("HH:mm");

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
                  {date} • {time}
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
                  {address}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <CancelPolicy />
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
