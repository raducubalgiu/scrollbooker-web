import {
  Appointment,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import { formatPrice } from "@/utils/formatPrice";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

type AppointmentCardInfoProps = {
  appointment: Appointment;
};

export default function AppointmentCardInfo({
  appointment,
}: AppointmentCardInfoProps) {
  const isCustomer = appointment.is_customer;
  const specialist = appointment.user;
  const customer = appointment.customer;
  const user = isCustomer ? specialist : customer;

  const durationText = AppointmentUtils.getDurationText(
    appointment.total_duration
  );

  const getProductNames = (appointment: Appointment) => {
    return appointment.products.map((product) => product.name).join(" + ");
  };

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
          {durationText}
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
            {formatPrice(appointment.total_price_with_discount)} RON
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

const styles = {
  avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
};
