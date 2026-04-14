"use client";

import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  StackProps,
  Typography,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import UserAvatar from "@/components/core/Avatar/UserAvatar";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Link from "next/link";

type BusinessStickyCardProps = {
  business: BusinessProfile;
};

export default function BusinessStickyCard({
  business,
}: BusinessStickyCardProps) {
  const { followers_count, followings_count, ratings_count } =
    business.owner.counters;
  const { lng, lat } = business.location.coordinates;
  const mapsUrl = `https://google.com/maps/dir/?api=1&?destination=${lat},${lng})`;

  return (
    <Box
      sx={{
        position: { lg: "sticky" },
        top: { lg: 88 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 2, md: 5 },
          borderRadius: 10,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Stack alignItems="center" justifyContent="center">
          <UserAvatar
            isBusinessOrEmployee={true}
            openNow={true}
            url={business.owner.avatar ?? ""}
            alt=""
            size="xl"
          />

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 5, gap: 2 }}
          >
            <UserInfoCounter
              label="Urmărești"
              counter={followings_count}
              isLoading={false}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 20, mx: 1.5, alignSelf: "center" }}
            />

            <UserInfoCounter
              label="Urmăritori"
              counter={followers_count}
              isLoading={false}
            />

            <Divider
              orientation="vertical"
              flexItem
              sx={{ height: 20, mx: 1.5, alignSelf: "center" }}
            />

            <UserInfoCounter
              label="Recenzii"
              counter={ratings_count}
              isLoading={false}
            />
          </Stack>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            p: 2,
            textTransform: "none",
            fontWeight: 700,
            mt: 5,
            fontSize: 17,
          }}
        >
          Rezerva acum
        </Button>

        <Box my={5}>
          <Stack direction="row" alignItems="center" gap={2} mb={3}>
            <AccessTimeOutlinedIcon
              fontSize="large"
              sx={{ color: "text.secondary" }}
            />
            <Typography variant="h6" color="text.primary" fontWeight={400}>
              Deschis pana la 12:00
            </Typography>

            <KeyboardArrowDownOutlinedIcon />
          </Stack>

          <Stack direction="row" gap={2}>
            <FmdGoodOutlinedIcon
              fontSize="large"
              sx={{ color: "text.secondary" }}
            />
            <Box>
              <Typography variant="h6" color="text.primary" fontWeight={400}>
                {business.location.formatted_address}
              </Typography>
              <Link
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card-container"
                style={{ textDecoration: "none" }}
                prefetch={false}
              >
                <Typography
                  fontWeight={600}
                  variant="h6"
                  sx={{ color: "primary.main" }}
                  mt={1}
                >
                  Obține indicații de orientare
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}

type UserInfoCounterProps = {
  label: string;
  counter: number | undefined;
  isLoading: boolean;
} & StackProps;

function UserInfoCounter({
  label,
  counter,
  isLoading,
  ...props
}: UserInfoCounterProps) {
  return (
    <Stack alignItems="center" {...props}>
      <Typography
        sx={{ mb: 1.5, fontWeight: 500, fontSize: 17 }}
        color="text.secondary"
      >
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 800, fontSize: 25 }}>{counter}</Typography>
    </Stack>
  );
}
