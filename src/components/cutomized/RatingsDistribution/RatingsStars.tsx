import React, { memo } from "react";
import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

type RatingsStarsProps = {
  rating: number;
  maxRating?: number;
  starSize?: number;
  spacing?: number;
  color?: string;
};

const RatingsStars = ({
  rating,
  maxRating = 5,
  starSize = 24,
  spacing = 4,
  color,
}: RatingsStarsProps) => {
  const stars = [] as React.ReactNode[];
  for (let i = 1; i <= maxRating; i++) {
    const isSolid = i <= rating;
    stars.push(
      isSolid ? (
        <StarIcon
          key={i}
          sx={{ fontSize: starSize, color: color ?? "primary.main" }}
        />
      ) : (
        <StarBorderIcon
          key={i}
          sx={{ fontSize: starSize, color: color ?? "primary.main" }}
        />
      )
    );
  }

  return (
    <Box
      sx={{ display: "flex", gap: `${spacing}px`, alignItems: "center" }}
      aria-hidden
    >
      {stars}
    </Box>
  );
};

export default memo(RatingsStars);
