import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { Theme } from "@mui/material";

export const getStatusColor = (
  status: AppointmentStatusEnum | string | undefined,
  theme: Theme
): string => {
  const key = (status ?? "").toString().toLowerCase();
  switch (key) {
    case AppointmentStatusEnum.IN_PROGRESS:
      return theme.palette.success.main;
    case AppointmentStatusEnum.FINISHED:
      return (
        (theme.palette.grey && theme.palette.grey[600]) ||
        (theme.palette.text && theme.palette.text.secondary) ||
        "#999"
      );
    case AppointmentStatusEnum.CANCELED:
      return theme.palette.secondary.main;
    default:
      return theme.palette.primary.main;
  }
};

export const getChannelColor = (
  channel: AppointmentChannelEnum | string | undefined,
  theme: Theme
) => {
  const key = (channel ?? "").toString().toLowerCase();
  switch (key) {
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
};

export const getStatusButtonColor = (
  status: AppointmentStatusEnum | string | undefined
):
  | "inherit"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning" => {
  const key = (status ?? "").toString().toLowerCase();
  switch (key) {
    case AppointmentStatusEnum.IN_PROGRESS:
      return "success";
    case AppointmentStatusEnum.FINISHED:
      return "primary";
    case AppointmentStatusEnum.CANCELED:
      return "error";
    default:
      return "inherit";
  }
};
