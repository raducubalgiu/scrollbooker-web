import { Box, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import AvatarWithRating from "../../Avatar/AvatarWithRating";
import ProfileAddress from "@/components/modules/Marketplace/ProfileModule/ProfileAddress";
import { formatRating } from "@/utils/formatters";

type LinkedProductsUserInfoProps = {
  avatar: string | null;
  fullname: string;
  ratingsAverage: number;
  ratingsCount: number;
  address: string;
  distanceKm: number | null;
};

const LinkedProductsUserInfo = ({
  avatar,
  fullname,
  ratingsAverage,
  ratingsCount,
  address,
  distanceKm,
}: LinkedProductsUserInfoProps) => {
  return (
    <Stack direction="row" alignItems="center" gap={2} m={2.5}>
      <AvatarWithRating avatar={avatar} ratingsAverage={null} />

      <Box sx={{ minWidth: 0 }}>
        <Stack spacing={0.2}>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontWeight: 600,
            }}
          >
            {fullname}
          </Typography>

          <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
            <Typography fontWeight={600}>
              {formatRating(ratingsAverage)}
            </Typography>
            <Rating value={4.9} precision={0.5} readOnly size="small" />
            <Typography fontWeight={600}>({ratingsCount})</Typography>
          </Stack>

          <ProfileAddress
            address={address}
            distanceKm={distanceKm}
            variant="body2"
            icon
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default LinkedProductsUserInfo;
