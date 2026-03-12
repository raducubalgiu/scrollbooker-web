import UserListItem from "@/components/cutomized/UserListItem/UserListItem";
import { AppointmentResponse } from "@/ts/models/booking/appointment/AppointmentResponse";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { Label } from "@/components/cutomized/Label/Label";
import {
  AppointmentStatusEnum,
  getAppointmentStatusLabel,
} from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import {
  AppointmentChannelEnum,
  getAppointmentChannelLabel,
} from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import { DateTimeCard } from "./DateTimeCard";
import dayjs from "dayjs";

const AppointmentItem = ({
  appointment,
}: {
  appointment: AppointmentResponse;
}) => {
  const theme = useTheme();

  const statusColor = React.useMemo(() => {
    switch (appointment.status) {
      case AppointmentStatusEnum.CONFIRMED:
        return theme.palette.success.main;
      case AppointmentStatusEnum.FINISHED:
        return (
          (theme.palette.grey && theme.palette.grey[600]) ||
          theme.palette.text.secondary
        );
      case AppointmentStatusEnum.CANCELLED:
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  }, [appointment.status, theme]);

  const channelColor = React.useMemo(() => {
    switch (appointment.channel) {
      case AppointmentChannelEnum.SCROLL_BOOKER:
        return theme.palette.primary.main;
      case AppointmentChannelEnum.OWN_CLIENT:
        return (
          (theme.palette.grey && theme.palette.grey[600]) ||
          theme.palette.text.secondary
        );
      default:
        return theme.palette.primary.main;
    }
  }, [appointment.channel, theme]);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2.5}>
        <Label
          title={getAppointmentStatusLabel(appointment.status)}
          color={statusColor}
        />
        <Label
          title={getAppointmentChannelLabel(appointment.channel)}
          color={channelColor}
        />
      </Stack>

      <Typography variant="h5" fontWeight={600} sx={{ mb: 2.5 }}>
        {dayjs(appointment.start_date).format("D MMMM")} -{" "}
        {dayjs(appointment.start_date).format("HH:mm")}
      </Typography>

      <Stack direction="row" justifyContent={"space-between"} mt={1}>
        <Box>
          <UserListItem
            name={appointment.customer.fullname}
            username={appointment.customer.username}
            avatar={appointment.customer.avatar}
            onClick={() => {}}
          />

          <Typography variant="h6" sx={{ my: 1.5 }} fontWeight={500}>
            Tuns
          </Typography>

          <Stack direction="row" alignItems="center" spacing={0.5} mb={2.5}>
            <AccessTimeIcon />

            <Typography color="text.secondary">
              {appointment.total_duration} min
            </Typography>
          </Stack>

          <Typography variant="h6" fontWeight={600}>
            {appointment.total_price} RON
          </Typography>
        </Box>
        <Box>
          <DateTimeCard
            day={new Date(appointment.start_date).getDate()}
            month={new Date(appointment.start_date).toLocaleString("default", {
              month: "long",
            })}
            time={new Date(appointment.start_date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default AppointmentItem;
