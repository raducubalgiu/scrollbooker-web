"use client";

import {
  Box,
  Button,
  Divider,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import UserAvatar from "@/components/core/Avatar/UserAvatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";
import { formatRating } from "@/utils/formatters";

type BusinessStickyCardProps = {
  business: BusinessProfile;
};

export default function BusinessStickyCard({
  business,
}: BusinessStickyCardProps) {
  const router = useRouter();
  const { fullname } = business.owner;
  const { ratings_average, ratings_count } = business.owner.counters;
  const mapsUrl = getGoogleMapsDirectionsUrl(business.location.coordinates);

  return (
    <Box
      sx={{
        mt: 5,
        position: { lg: "sticky" },
        top: { lg: 88 },
      }}
    >
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 6,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" alignItems="center" gap={2.5} mb={3}>
          <UserAvatar
            isBusinessOrEmployee={true}
            openNow={true}
            url={business.owner.avatar ?? ""}
            alt={business.owner.fullname}
            size="lg"
          />

          <Box sx={{ minWidth: 0 }}>
            <Stack spacing={0.5}>
              <Typography variant="h3" fontWeight={600}>
                {fullname}
              </Typography>
              <Stack flexDirection="row" alignItems="center" gap={1}>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {formatRating(ratings_average)}
                </Typography>
                <Rating
                  value={ratings_average || 0}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  ({ratings_count || 0})
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>

        <Button
          variant="contained"
          fullWidth
          disableElevation
          sx={{
            py: 1.8,
            textTransform: "none",
            fontWeight: 700,
            fontSize: 17,
          }}
          onClick={() =>
            router.push(
              `/booking/${business.id}?businessOwnerId=${business.owner.id}`
            )
          }
        >
          Rezervă acum
        </Button>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={3.5}>
          <Stack direction="row" alignItems="center" gap={2} mb={2.5}>
            <AccessTimeOutlinedIcon sx={{ fontSize: 30 }} />
            <Typography color="text.primary" fontSize={18} fontWeight={500}>
              Deschis până la 12:00
            </Typography>
            <KeyboardArrowDownOutlinedIcon fontSize="medium" />
          </Stack>

          <Stack direction="row" gap={2}>
            <FmdGoodOutlinedIcon sx={{ fontSize: 32.5 }} />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                color="text.primary"
                fontSize={18}
                fontWeight={500}
                sx={{ lineHeight: 1.4 }}
              >
                {business.location.formatted_address}
              </Typography>
              <Link
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
                prefetch={false}
              >
                <Typography
                  fontWeight={600}
                  fontSize={18}
                  sx={{ color: "primary.main", display: "inline-block", mt: 1 }}
                >
                  Obține indicații de orientare
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
