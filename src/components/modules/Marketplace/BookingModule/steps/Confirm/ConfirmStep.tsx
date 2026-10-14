"use client";

import React from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Divider,
  Paper,
  Rating,
  alpha,
} from "@mui/material";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { AvailableTimeSlot } from "@/ts/models/booking/availability/AvailableTimeSlot";
import dayjs from "dayjs";
import { formatRating } from "@/utils/formatters";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";
import CancelPolicy from "./CancelPolicy";
import ConfirmServicesSummary from "./ConfirmServicesSummary";
import { SelectedBookingItem } from "../../BookingModule";

type ConfirmStepProps = {
  selectedTimeSlot: AvailableTimeSlot | null;
  address: string;
  owner: BookingFlowUser;
  selectedItems: SelectedBookingItem[];
  selectedEmployeeId: number | null;
};

const ConfirmStep = ({
  selectedTimeSlot,
  address,
  owner,
  selectedItems,
  selectedEmployeeId,
}: ConfirmStepProps) => {
  const date = dayjs(selectedTimeSlot?.start_date_locale).format(
    "dddd, D MMMM YYYY"
  );
  const time = dayjs(selectedTimeSlot?.start_date_locale).format("HH:mm");

  return (
    <Box sx={{ minWidth: 0, pb: 4 }}>
      <Typography fontWeight={800} variant="h2" mt={{ xs: 1, md: 3 }}>
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
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            border: 1.5,
            borderColor: "divider",
            bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction="row" alignItems="center" gap={2}>
              <Avatar
                src={owner.avatar ?? ""}
                variant="rounded"
                sx={styles.ownerAvatar}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={700} noWrap>
                  {owner.fullname}
                </Typography>
                <Stack direction="row" alignItems="center" gap={0.75}>
                  <Typography variant="body2" fontWeight={700}>
                    {formatRating(owner.ratings_average)}
                  </Typography>
                  <Rating
                    readOnly
                    size="small"
                    value={owner.ratings_average}
                    precision={0.5}
                  />
                  <Typography variant="body2" color="text.secondary">
                    ({owner.ratings_count})
                  </Typography>
                </Stack>
              </Box>
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="center" gap={2}>
              <Box sx={styles.iconWrapper}>
                <CalendarTodayOutlinedIcon color="primary" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={700}>Data și Ora</Typography>
                <Typography color="text.secondary" variant="body2" noWrap>
                  {date} • {time}
                </Typography>
              </Box>
            </Stack>

            <Divider />

            <Stack direction="row" alignItems="center" gap={2}>
              <Box sx={styles.iconWrapper}>
                <FmdGoodOutlinedIcon color="primary" />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography fontWeight={700}>Locație</Typography>
                <Typography color="text.secondary" variant="body2" noWrap>
                  {address}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        <ConfirmServicesSummary
          selectedItems={selectedItems}
          selectedEmployeeId={selectedEmployeeId}
        />

        <CancelPolicy />
      </Stack>
    </Box>
  );
};

const styles = {
  iconWrapper: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 2,
    bgcolor: "background.paper",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: 1,
    borderColor: "divider",
  },
  ownerAvatar: {
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 2,
    border: 1,
    borderColor: "divider",
  },
};

export default ConfirmStep;
