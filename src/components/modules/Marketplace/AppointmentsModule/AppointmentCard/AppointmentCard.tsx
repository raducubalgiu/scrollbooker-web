"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  ListItem,
  ListItemButton,
} from "@mui/material";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import {
  Appointment,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import AppointmentCardDate from "./AppointmentCardDate";
import AppointmentCardInfo from "./AppointmentCardInfo";

type AppointmentCardProps = {
  appointment: Appointment;
  navigateToAppointmentDetails: (appointmentId: number) => void;
};

const formatDay = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
  }).format(date);
};

const formatMonth = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export default function AppointmentCard({
  appointment,
  navigateToAppointmentDetails,
}: AppointmentCardProps) {
  const startDate = new Date(appointment.start_date);
  const statusLabel = AppointmentUtils.getStatusLabel(appointment.status);
  const statusColor = AppointmentUtils.getStatusColor(appointment.status);

  return (
    <ListItem disablePadding sx={{ px: 1.5 }}>
      <ListItemButton>
        <Stack
          onClick={() => navigateToAppointmentDetails(appointment.id)}
          sx={{
            width: "100%",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <Stack sx={{ width: "100%" }}>
            <Typography
              color={statusColor}
              sx={{
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {statusLabel}
            </Typography>

            <Box sx={{ height: 24 }} />

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              sx={{ width: "100%" }}
              spacing={1}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <AppointmentCardInfo appointment={appointment} />
              </Box>

              <AppointmentCardDate
                day={formatDay(startDate)}
                month={formatMonth(startDate)}
                startTime={formatTime(startDate)}
              />
            </Stack>
          </Stack>

          <Box sx={{ height: 16 }} />

          {appointment.status === AppointmentStatusEnum.FINISHED &&
            appointment.is_customer && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.75}
                sx={{ pt: 0.75 }}
              >
                <VideocamOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: "rgba(128,128,128,0.8)",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "rgba(128,128,128,0.85)",
                  }}
                >
                  Poți adăuga o recenzie video
                </Typography>
              </Stack>
            )}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}
