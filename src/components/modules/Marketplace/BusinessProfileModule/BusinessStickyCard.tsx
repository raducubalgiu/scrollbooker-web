"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

type BusinessStickyCardProps = {
  name: string;
  avatarUrl?: string | null;
  category?: string | null;
  city?: string | null;
  rating?: number | null;
  reviewsCount?: number | null;
  followersCount?: number | null;
  isOpenNow?: boolean | null;
  openUntil?: string | null;
  responseTime?: string | null;
  bookingType?: "instant" | "approval" | null;
  nextAvailabilityLabel?: string | null;
  onFollow: () => void;
  onBook: () => void;
  onMessage: () => void;
  onShare: () => void;
  onSave: () => void;
};

export default function BusinessStickyCard({
  name,
  avatarUrl,
  category,
  city,
  rating,
  reviewsCount,
  followersCount,
  isOpenNow,
  openUntil,
  responseTime,
  bookingType,
  nextAvailabilityLabel,
  onFollow,
  onBook,
  onMessage,
  onShare,
  onSave,
}: BusinessStickyCardProps) {
  return (
    <Box
      sx={{
        position: { lg: "sticky" },
        top: { lg: 88 },
      }}
    >
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 4,
          bgcolor: "background.paper",
          p: { xs: 2, md: 2.5 },
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <Stack spacing={2.25}>
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
        </Stack>
      </Box>
    </Box>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      spacing={2}
      alignItems="center"
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Stack>
  );
}

function TextActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="text"
      startIcon={icon}
      sx={{
        borderRadius: 999,
        textTransform: "none",
        fontWeight: 600,
        px: 1.25,
      }}
    >
      {label}
    </Button>
  );
}

function formatCompactNumber(value: number) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
}

function buildOpenLabel(isOpenNow?: boolean | null, openUntil?: string | null) {
  if (isOpenNow) {
    return openUntil ? `Deschis până la ${openUntil}` : "Deschis acum";
  }

  return "Închis acum";
}
