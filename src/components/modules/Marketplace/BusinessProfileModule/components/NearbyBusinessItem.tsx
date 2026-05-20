import { NearbyBusiness } from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";
import { Box, Link, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import React from "react";
import { makeProfessionSlug } from "@/utils/make-profession-slug";
import NearbyBusinessImage from "./NearbyBusinessImage";

type NearbyBusinessItemProps = {
  business: NearbyBusiness;
};

const NearbyBusinessItem = ({ business }: NearbyBusinessItemProps) => {
  const { owner, location, media_files } = business;
  const { fullname, username, counters, profession } = owner;

  const professionSlug = makeProfessionSlug(profession);
  const hasImage = !!business.media_files?.[0]?.thumbnail_url;
  const url = media_files[0]?.thumbnail_url;

  return (
    <Box
      component={Link}
      href={`/business/${professionSlug}/${username}`}
      sx={styles.container}
    >
      <NearbyBusinessImage
        hasImage={hasImage}
        url={url || "placeholder.jpg"}
        username={username}
      />

      <Box sx={{ minWidth: 0, width: "100%" }}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontWeight={600} variant="h5" noWrap>
            {fullname}
          </Typography>

          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <StarRoundedIcon color="rating" />

            <Typography fontWeight={600}>
              {formatRating(counters.ratings_average)}
            </Typography>

            <Typography color="text.secondary">
              ({counters.ratings_count})
            </Typography>
          </Stack>
        </Stack>

        <Typography color="text.secondary">{profession}</Typography>

        <Typography color="text.secondary">
          {location.formatted_address}
        </Typography>
      </Box>
    </Box>
  );
};

export default NearbyBusinessItem;

const styles = {
  container: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    "&:hover .business-image": {
      transform: "scale(1.02)",
    },
  },
};
