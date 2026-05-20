import { NearbyBusiness } from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";
import { Box, Link, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Image from "next/image";
import React from "react";
import { makeProfessionSlug } from "@/utils/make-profession-slug";

type NearbyBusinessItemProps = {
  business: NearbyBusiness;
};

const NearbyBusinessItem = ({ business }: NearbyBusinessItemProps) => {
  const { owner, location } = business;
  const { fullname, username, counters, profession } = owner;

  const professionSlug = makeProfessionSlug(profession);

  return (
    <Box
      component={Link}
      href={`/business/${professionSlug}/${username}`}
      sx={styles.container}
    >
      <Box sx={styles.imageContainer}>
        <Image
          src={business.media_files[0]?.thumbnail_url ?? ""}
          alt={username}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 25vw"
          className="business-image"
          style={{
            objectFit: "cover",
            transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </Box>
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
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: "1.4/1",
    borderRadius: 4,
    overflow: "hidden",
    bgcolor: "action.hover",
  },
};
