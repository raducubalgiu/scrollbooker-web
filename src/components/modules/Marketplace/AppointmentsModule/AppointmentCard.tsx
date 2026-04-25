"use client";

import React from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  ListItem,
  ListItemButton,
} from "@mui/material";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  Appointment,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { formatPrice } from "@/utils/formatPrice";

type AppointmentCardProps = {
  appointment: Appointment;
  navigateToAppointmentDetails: (appointmentId: number) => void;
};

const formatDuration = (minutes: number) => {
  if (!minutes) return "0 min";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins} min`;
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

const getCurrencyLabel = (
  currency: Appointment["payment_currency"] | undefined | null
) => {
  if (!currency) return "";
  return (
    (currency as { code?: string }).code ??
    (currency as { symbol?: string }).symbol ??
    (currency as { name?: string }).name ??
    ""
  );
};

const getProductNames = (appointment: Appointment) => {
  return appointment.products.map((product) => product.name).join(" + ");
};

type AppointmentCardDateProps = {
  day: string;
  month: string;
  startTime: string;
};

function AppointmentCardDate({
  day,
  month,
  startTime,
}: AppointmentCardDateProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        minWidth: 84,
        px: 1.5,
        py: 1.25,
        borderRadius: "18px",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {day}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: "text.secondary",
          textTransform: "capitalize",
        }}
      >
        {month}
      </Typography>

      <Typography
        sx={{
          mt: 0.75,
          fontSize: 13,
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {startTime}
      </Typography>
    </Stack>
  );
}

type AppointmentCardInfoProps = {
  appointment: Appointment;
};

function AppointmentCardInfo({ appointment }: AppointmentCardInfoProps) {
  const isCustomer = appointment.is_customer;
  const specialist = appointment.user;
  const customer = appointment.customer;
  const user = isCustomer ? specialist : customer;

  return (
    <Stack>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <Avatar
          sx={styles.avatar}
          src={user.avatar ?? ""}
          alt={user.fullname}
        />

        <Stack minWidth={0}>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
              color: "text.primary",
            }}
            noWrap
          >
            {user.fullname}
          </Typography>

          <Typography
            sx={{
              fontSize: 15,
              color: "text.secondary",
            }}
            noWrap
          >
            {user.profession ?? ""}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ height: 16 }} />

      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 400,
          color: "text.secondary",
        }}
        noWrap
      >
        {getProductNames(appointment)}
      </Typography>

      <Box sx={{ height: 8 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <AccessTimeOutlinedIcon
          sx={{ fontSize: 20, color: "text.secondary" }}
        />
        <Typography sx={{ color: "text.secondary", fontSize: 15 }}>
          {formatDuration(appointment.total_duration)}
        </Typography>
      </Stack>

      <Box sx={{ height: 8 }} />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ minWidth: 0, flexWrap: "wrap" }}
        >
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {formatPrice(appointment.total_price_with_discount)}{" "}
            {getCurrencyLabel(appointment.payment_currency)}
          </Typography>

          {appointment.total_discount > 0 && (
            <>
              <Typography
                sx={{
                  fontSize: 15,
                  color: "text.secondary",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(appointment.total_price)}
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "error.main",
                }}
              >
                (-{Number(appointment.total_discount).toFixed(2)}%)
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

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
                //color: statusColor,
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
                  You can add a video review
                </Typography>
              </Stack>
            )}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

const styles = {
  avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
};
