import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import Image from "next/image";
import { formatRating } from "@/utils/formatters";
import StarIcon from "@mui/icons-material/Star";
import BusinessProductCard from "./BusinessProductCard";
import { BusinessSheet } from "@/ts/models/booking/business/search/BusinessSheet";
import Link from "next/link";
import { makeProfessionSlug } from "@/utils/make-profession-slug";

type BusinessCardProps = { business: BusinessSheet };

const BusinessCard = ({ business }: BusinessCardProps) => {
  const { owner, media_files, address, products } = business;
  const { fullname, ratings_average, ratings_count, profession } = owner;

  const professionSlug = makeProfessionSlug(profession);

  return (
    <Box sx={{ overflow: "hidden", borderRadius: 2 }}>
      <Box
        component={Link}
        target="_blank"
        href={`/business/${professionSlug}/${owner.username}`}
        rel="noopener noreferrer"
        sx={styles.container}
      >
        <Box sx={styles.imageContainer}>
          <Box className="imageWrapper" sx={styles.imageWrapper}>
            {media_files?.[0]?.thumbnail_url && (
              <Image
                src={media_files?.[0]?.thumbnail_url}
                alt={fullname}
                fill
                sizes="(max-width: 600px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                  backgroundColor: "#eee",
                }}
              />
            )}
          </Box>
        </Box>

        <Stack
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          mt={{ xs: 1, sm: 1.5 }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: { xs: "1rem", sm: "1.1rem" },
              }}
            >
              {fullname}
            </Typography>
          </Box>

          <Stack flexDirection="row" alignItems="center" gap={1}>
            <StarIcon fontSize="small" color="primary" />
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{ fontSize: { xs: "1rem", sm: "1.1rem" } }}
            >
              {formatRating(ratings_average)}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight={400}
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              ({ratings_count})
            </Typography>
          </Stack>
        </Stack>

        <Typography
          color="text.secondary"
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {profession}
        </Typography>

        <Typography
          color="text.secondary"
          noWrap
          fontWeight={400}
          mt={{ xs: 1, sm: 1.5 }}
          mb={{ xs: 1.5, sm: 2.5 }}
          sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
        >
          {address}
        </Typography>
      </Box>

      {products.map((prod) => (
        <BusinessProductCard key={prod.id} product={prod} />
      ))}
    </Box>
  );
};

export default memo(BusinessCard);

const styles = {
  container: {
    textDecoration: "none",
    display: "block",
    color: "inherit",
    cursor: "pointer",
    "&:hover .imageWrapper": {
      transform: "scale(1.05)",
    },
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: { xs: 0, sm: 280 },
    paddingTop: { xs: "56.25%", sm: 0 },
    overflow: "hidden",
    borderRadius: 5,
  },
  imageWrapper: {
    position: "absolute",
    inset: 0,
    transition: "transform 0.3s",
    backgroundColor: "background.default",
  },
};
