import RatingsStars from "@/components/cutomized/RatingsDistribution/RatingsStars";
import { Stack, Typography } from "@mui/material";
import React from "react";

type ReviewsSummaryHeaderProps = {
  ratings_average: number;
  ratings_count: number;
};

const ReviewsSummaryHeader = ({
  ratings_average,
  ratings_count,
}: ReviewsSummaryHeaderProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{ my: 1.5 }}>
      <Stack flexDirection="row" alignItems="center">
        <Typography variant="h4" fontWeight={600}>
          {ratings_average}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" ml={1.5}>
          ({ratings_count})
        </Typography>
      </Stack>
      <RatingsStars rating={ratings_average} />
    </Stack>
  );
};

export default ReviewsSummaryHeader;
