import { formatRating } from "@/utils/formatters";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { EmployeeDataType } from "./BookingCart";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";

type BookingCartHeaderProps = {
  businessOwner: BookingFlowUser;
  employeeData: EmployeeDataType;
};

const BookingCartHeader = ({
  businessOwner,
  employeeData,
}: BookingCartHeaderProps) => {
  const { avatar, fullname, ratings_average, ratings_count } = businessOwner;

  return (
    <Box sx={styles.container}>
      <Stack flexDirection="row" gap={2}>
        <Avatar src={avatar ?? ""} variant="rounded" sx={styles.avatar} />
        <Stack justifyContent="center" sx={{ minWidth: 0 }}>
          <Typography fontSize={23} fontWeight={700} noWrap>
            {fullname}
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={1}>
            <Typography fontSize={20} fontWeight={700}>
              {formatRating(ratings_average)}
            </Typography>
            <Rating readOnly value={ratings_average} precision={0.5} />
            <Typography fontSize={18} color="text.secondary">
              ({ratings_count})
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {employeeData.selectedEmployeeId &&
        employeeData.selectedEmployeeId !== businessOwner.id && (
          <Stack flexDirection="row" alignItems="center" gap={1} mt={2.5}>
            <Avatar
              src={employeeData.avatar ?? ""}
              sx={{ width: 30, height: 30, border: 1, borderColor: "divider" }}
            />
            <Typography fontSize={15} fontWeight={500} noWrap>
              Specialist: <strong>{employeeData.fullname}</strong>
            </Typography>
          </Stack>
        )}
    </Box>
  );
};

export default BookingCartHeader;

const styles = {
  container: {
    borderBottom: "1px solid",
    borderColor: "divider",
    p: 5,
    pb: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    border: 1,
    borderColor: "divider",
    borderRadius: 4,
  },
};
