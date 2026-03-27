"use client";

import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import UserInfoCounters from "@/components/core/Layout/Admin/UserInfo/UserInfoCounters";

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
      <Paper sx={{ p: { xs: 2, md: 2.5 } }}>
        <Stack alignItems="center" justifyContent="center">
          <Avatar
            src={business.owner.avatar ?? ""}
            sx={{ width: 100, height: 100 }}
          />

          <UserInfoCounters
            counters={{
              followers_count: 0,
              followings_count: 0,
              ratings_average: 4.5,
              ratings_count: 20,
              posts_count: 0,
              user_id: 1,
              products_count: 0,
            }}
            isLoading={false}
          />

          <Stack direction="row" alignItems="center" gap={2}>
            <LocationOnOutlinedIcon fontSize="large" />
            <Typography variant="h6" color="text.secondary">
              {business.location.formatted_address}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Button
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            p: 1.75,
            textTransform: "none",
            fontWeight: 700,
            mt: 2,
            fontSize: 17,
          }}
        >
          Rezerva acum
        </Button>

        {/* <Stack spacing={2.25}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              src={avatarUrl ?? ""}
              alt={name}
              sx={{
                width: { xs: 56, md: 64 },
                height: { xs: 56, md: 64 },
              }}
            />
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {name}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
                sx={{ mt: 0.75 }}
              >
                {category && (
                  <Typography variant="body2" color="text.secondary">
                    {category}
                  </Typography>
                )}

                {city && (
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    sx={{ color: "text.secondary" }}
                  >
                    <PlaceOutlinedIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{city}</Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {typeof rating === "number" && (
              <Chip
                icon={<StarRoundedIcon />}
                label={`${rating.toFixed(1)}${typeof reviewsCount === "number" ? ` (${reviewsCount})` : ""}`}
                sx={{
                  borderRadius: 999,
                  "& .MuiChip-icon": {
                    color: "#f5b301",
                  },
                }}
              />
            )}

            {typeof followersCount === "number" && (
              <Chip
                icon={<PeopleAltOutlinedIcon />}
                label={`${formatCompactNumber(followersCount)} urmăritori`}
                sx={{ borderRadius: 999 }}
              />
            )}

            <Chip
              icon={<AccessTimeRoundedIcon />}
              label={buildOpenLabel(isOpenNow, openUntil)}
              color={isOpenNow ? "success" : "default"}
              sx={{ borderRadius: 999 }}
            />
          </Stack>

          <Divider />

          <Stack spacing={1.2}>
            <InfoRow
              label="Răspuns"
              value={responseTime ?? "Răspunde în câteva ore"}
            />

            <InfoRow
              label="Rezervare"
              value={
                bookingType === "instant"
                  ? "Confirmare instant"
                  : "Necesită aprobare"
              }
            />

            <InfoRow
              label="Disponibilitate"
              value={nextAvailabilityLabel ?? "Azi, intervale disponibile"}
            />
          </Stack>

          <Divider />

          <Stack spacing={1.25}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CalendarMonthRoundedIcon />}
              onClick={onBook}
              sx={{
                height: 48,
                borderRadius: 999,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Rezervă acum
            </Button>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FavoriteBorderRoundedIcon />}
                onClick={onFollow}
                sx={{
                  height: 44,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Follow
              </Button>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<ChatBubbleOutlineRoundedIcon />}
                onClick={onMessage}
                sx={{
                  height: 44,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Mesaj
              </Button>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction="row" spacing={1}>
            <TextActionButton
              icon={<IosShareRoundedIcon sx={{ fontSize: 18 }} />}
              label="Distribuie"
              onClick={onShare}
            />
            <TextActionButton
              icon={<FavoriteBorderRoundedIcon sx={{ fontSize: 18 }} />}
              label="Salvează"
              onClick={onSave}
            />
          </Stack>
        </Stack> */}
      </Paper>
    </Box>
  );
}

// function formatCompactNumber(value: number) {
//   if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
//   if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
//   return `${value}`;
// }

// function buildOpenLabel(isOpenNow?: boolean | null, openUntil?: string | null) {
//   if (isOpenNow) {
//     return openUntil ? `Deschis până la ${openUntil}` : "Deschis acum";
//   }

//   return "Închis acum";
// }
