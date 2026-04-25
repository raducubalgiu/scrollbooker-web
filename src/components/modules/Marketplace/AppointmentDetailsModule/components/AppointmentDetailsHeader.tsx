import dayjs from "@/lib/dayjs";
import {
  AppointmentUser,
  AppointmentUtils,
} from "@/ts/models/booking/appointment/Appointment";
import { AppointmentStatusEnum } from "@/ts/models/booking/appointment/AppointmentStatusEnum";
import { formatRating } from "@/utils/formatters";
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import React from "react";
import Link from "next/link";

type AppointmentDetailsHeaderProps = {
  status: AppointmentStatusEnum;
  startDate: string;
  totalDuration: number;
  user: AppointmentUser;
  canceledReason: string | null;
};

const AppointmentDetailsHeader = ({
  status,
  startDate,
  totalDuration,
  user,
  canceledReason,
}: AppointmentDetailsHeaderProps) => {
  const {
    username,
    fullname,
    profession,
    avatar,
    ratings_average,
    ratings_count,
  } = user;
  const statusLabel = AppointmentUtils.getStatusLabel(status);

  return (
    <Box>
      <Chip label={statusLabel} />

      {status === AppointmentStatusEnum.CANCELED && canceledReason && (
        <Alert variant="outlined" severity="error" sx={{ mt: 2.5 }}>
          Motiv: {canceledReason}
        </Alert>
      )}

      <Typography variant="h4" fontWeight={700} mt={2}>
        {dayjs.utc(startDate).format("dddd, D MMMM YYYY HH:mm")}
      </Typography>
      <Typography variant="h6" color="text.secondary" fontWeight={500} mt={1}>
        ({totalDuration} min)
      </Typography>

      <Link
        href={`/profile/${username}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Stack flexDirection="row" alignItems="center" gap={2} my={5}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Stack
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                sx={styles.badgeContent}
              >
                <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
                <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                  {formatRating(ratings_average)}
                </Typography>
              </Stack>
            }
            sx={styles.badge}
          >
            <Avatar sx={styles.avatar} src={avatar ?? ""} />
          </Badge>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {fullname}
            </Typography>
            <Typography color="text.secondary">
              {profession} • {ratings_count} recenzii
            </Typography>
          </Box>
        </Stack>
      </Link>
    </Box>
  );
};

export default AppointmentDetailsHeader;

const styles = {
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "background.paper",
    px: 1.5,
    py: 0.5,
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: { width: 80, height: 80, border: 1, borderColor: "divider" },
};
