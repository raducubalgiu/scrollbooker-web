"use client";

import {
  Box,
  Button,
  ButtonBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import UserInfoCounters from "@/components/core/Layout/Admin/UserInfo/UserInfoCounters";
import UserAvatar from "@/components/core/Layout/Admin/UserInfo/UserAvatar";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

type BusinessStickyCardProps = {
  business: BusinessProfile;
};

export default function BusinessStickyCard({
  business,
}: BusinessStickyCardProps) {
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

          <UserInfoCounters
            counters={{
              followers_count: business.owner.counters.followers_count,
              followings_count: business.owner.counters.followings_count,
              ratings_average: business.owner.counters.ratings_average,
              ratings_count: business.owner.counters.ratings_count,
              posts_count: 0,
              user_id: 1,
              products_count: 0,
            }}
            isLoading={false}
          />
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
          <Stack direction="row" alignItems="center" gap={2} mb={2.5}>
            <AccessTimeOutlinedIcon
              fontSize="large"
              sx={{ color: "text.secondary" }}
            />
            <Typography variant="h6" color="text.secondary">
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
              <Typography variant="h6" color="text.secondary">
                {business.location.formatted_address}
              </Typography>
              <ButtonBase>
                <Typography
                  fontWeight={600}
                  variant="h6"
                  sx={{ color: "primary.main" }}
                  mt={1}
                >
                  Obține indicații de orientare
                </Typography>
              </ButtonBase>
            </Box>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
