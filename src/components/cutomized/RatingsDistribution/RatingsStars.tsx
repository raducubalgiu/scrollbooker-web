import React, { memo } from "react";
import { Box } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";

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
        <StarRateRoundedIcon
          key={i}
          sx={{ fontSize: starSize, color: color ?? "primary.main" }}
        />
      ) : (
        <StarOutlineRoundedIcon
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
