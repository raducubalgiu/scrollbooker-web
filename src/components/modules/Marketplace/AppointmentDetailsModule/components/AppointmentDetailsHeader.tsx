import dayjs from "@/lib/dayjs";
import {
  AppointmentUser,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import {
  Alert,
  alpha,
  Avatar,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import CustomAvatar from "@/components/cutomized/Avatar/CustomAvatar";
import { AppRoutes } from "@/utils/routes";

type AppointmentDetailsHeaderProps = {
  status: AppointmentStatusEnum;
  startDate: string;
  totalDuration: number;
  isCustomer: boolean;
  user: AppointmentUser;
  customer: AppointmentUser;
  canceledReason: string | null;
};

const AppointmentDetailsHeader = ({
  status,
  startDate,
  totalDuration,
  user,
  customer,
  isCustomer,
  canceledReason,
}: AppointmentDetailsHeaderProps) => {
  const statusLabel = AppointmentUtils.getStatusLabel(status);
  const totalDurationText = AppointmentUtils.getDurationText(totalDuration);

  const navigateUsername = isCustomer ? user.username : customer.username;
  const navigateProfession = isCustomer ? user.profession : customer.profession;

  const profileUrl =
    navigateUsername && navigateProfession
      ? AppRoutes.profile(navigateUsername, navigateProfession)
      : "";

  return (
    <Box>
      <Chip
        label={statusLabel}
        sx={{
          bgcolor: (theme) => {
            const colorKey = AppointmentUtils.getStatusColor(status);

            if (status === AppointmentStatusEnum.IN_PROGRESS) {
              return alpha(theme.palette.success.main, 0.4);
            }

            const mainColor =
              (theme.palette[colorKey as "success" | "error"] as any)?.main ||
              theme.palette.grey[600];
            return alpha(mainColor, 0.12);
          },
          color: (theme) => {
            if (status === AppointmentStatusEnum.IN_PROGRESS) {
              return theme.palette.success.dark;
            }

            const colorKey = AppointmentUtils.getStatusColor(status);
            return (
              (theme.palette[colorKey as "success" | "error"] as any)?.dark ||
              theme.palette.text.primary
            );
          },
          fontWeight: 600,
          fontSize: "0.85rem",
          borderRadius: "8px",
          "& .MuiChip-label": {
            px: 1.5,
          },
        }}
      />

      {status === AppointmentStatusEnum.CANCELED && canceledReason && (
        <Alert variant="outlined" severity="error" sx={{ mt: 2.5 }}>
          Motiv: {canceledReason}
        </Alert>
      )}

      <Typography variant="h4" fontWeight={700} mt={2}>
        {dayjs(startDate).format("dddd, D MMMM YYYY HH:mm")}
      </Typography>
      <Typography variant="h6" color="text.secondary" fontWeight={500} mt={1}>
        ({totalDurationText})
      </Typography>

      <Link
        href={profileUrl}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Stack flexDirection="row" alignItems="center" gap={2} my={5}>
          {isCustomer ? (
            <CustomAvatar
              avatar={user.avatar}
              ratingsAverage={user.ratings_average}
            />
          ) : (
            <Avatar
              src={customer.avatar ?? ""}
              sx={{ width: 70, height: 70 }}
            />
          )}
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {isCustomer ? user.fullname : customer.fullname}
            </Typography>
            <Typography color="text.secondary">
              {isCustomer
                ? `${user.profession} • ${user.ratings_count} recenzii`
                : customer.profession}
            </Typography>
          </Box>
        </Stack>
      </Link>
    </Box>
  );
};

export default AppointmentDetailsHeader;
