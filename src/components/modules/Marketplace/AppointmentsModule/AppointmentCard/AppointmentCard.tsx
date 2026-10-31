"use client";

import React from "react";
import NextLink from "next/link";
import {
  Box,
  Stack,
  Theme,
  ListItem,
  ListItemButton,
  alpha,
} from "@mui/material";
import PostBadge from "@/components/cutomized/Post/PostBadge";
import { getAppointmentChannelLabel } from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import {
  Appointment,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import AppointmentCardDate from "./AppointmentCardDate";
import AppointmentCardInfo from "./AppointmentCardInfo";
import dayjs from "@/lib/dayjs";
import { AppRoutes } from "@/utils/routes";

type AppointmentCardProps = {
  appointment: Appointment;
  onNavigate?: () => void;
};

export default function AppointmentCard({
  appointment,
  onNavigate = () => {},
}: AppointmentCardProps) {
  const start = dayjs(appointment.start_date);
  const statusLabel = AppointmentUtils.getStatusLabel(appointment.status);
  const statusColor = AppointmentUtils.getStatusColor(appointment.status);

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={NextLink}
        href={AppRoutes.appointmentDetails(appointment.id)}
        onClick={onNavigate}
      >
        <Stack
          sx={{
            width: "100%",
            userSelect: "none",
          }}
        >
          <Stack sx={{ width: "100%" }}>
            <Stack direction="row" spacing={0.75} alignItems="center">
              <PostBadge
                label={statusLabel}
                bgcolor={statusBadgeColors[statusColor].bgcolor}
                color={statusBadgeColors[statusColor].color}
              />
              {!appointment.is_customer && (
                <PostBadge
                  label={getAppointmentChannelLabel(appointment.channel)}
                  bgcolor="action.selected"
                  color="text.primary"
                />
              )}
            </Stack>

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
                day={start.format("DD")}
                month={start.format("MMM")}
                startTime={start.format("HH:mm")}
              />
            </Stack>
          </Stack>

          <Box sx={{ height: 16 }} />

          {/* {appointment.status === AppointmentStatusEnum.FINISHED &&
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
            )} */}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

const statusBadgeColors: Record<
  ReturnType<typeof AppointmentUtils.getStatusColor>,
  { bgcolor: (theme: Theme) => string; color: (theme: Theme) => string }
> = {
  success: {
    bgcolor: (theme) => alpha(theme.palette.success.main, 0.15),
    color: (theme) => theme.palette.success.main,
  },
  error: {
    bgcolor: (theme) => alpha(theme.palette.error.main, 0.12),
    color: (theme) => theme.palette.error.main,
  },
  warning: {
    bgcolor: (theme) => alpha(theme.palette.warning.main, 0.15),
    color: (theme) => theme.palette.warning.main,
  },
  default: {
    bgcolor: (theme) => theme.palette.action.selected,
    color: (theme) => theme.palette.text.secondary,
  },
};
