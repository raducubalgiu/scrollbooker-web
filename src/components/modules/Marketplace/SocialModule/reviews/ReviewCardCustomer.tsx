import { Avatar, Rating, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

type ReviewCardCustomerProps = {
  avatar: string;
  fullname: string;
  rating: number;
  createdAt: string;
};

const ReviewCardCustomer = ({
  avatar,
  fullname,
  rating,
  createdAt,
}: ReviewCardCustomerProps) => {
  const formattedDate = createdAt
    ? dayjs(createdAt).format("YY.MM.YYYY • HH:mm")
    : "...";

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{ width: "100%" }}
    >
      <Avatar
        src={avatar ?? ""}
        alt={fullname}
        sx={{ width: 40, height: 40 }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ flexGrow: 1 }}
      >
        <Stack direction="column" spacing={0.25}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {fullname}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: "0.85rem" }}
          >
            {formattedDate}
          </Typography>
        </Stack>

        <Rating value={rating} readOnly size="small" sx={{ color: "rating" }} />
      </Stack>
    </Stack>
  );
};

export default ReviewCardCustomer;
