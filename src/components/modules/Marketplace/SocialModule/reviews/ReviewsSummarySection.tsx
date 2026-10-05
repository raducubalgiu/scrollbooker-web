"use client";

import { memo, useMemo } from "react";
import { Box, Rating, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import ReviewSummaryCheckbox from "./ReviewSummaryCheckbox";

type ReviewSummary = {
  ratingsAverage: number;
  ratingsCount: number;
  breakdown: { rating: number; count: number }[];
};

type ReviewsSummarySectionProps = {
  summary: ReviewSummary;
  selectedRatings: ReadonlySet<number>;
  onRatingClick: (rating: number) => void;
};

const formatRating = (value: number) => value.toFixed(1);

const ReviewsSummarySection = ({
  summary,
  selectedRatings,
  onRatingClick,
}: ReviewsSummarySectionProps) => {
  const { ratingsAverage, ratingsCount, breakdown } = summary;
  const isEnabled = ratingsCount > 0;

  const sortedBreakdown = useMemo(
    () => [...breakdown].sort((a, b) => b.rating - a.rating),
    [breakdown]
  );

  const maxCount = useMemo(
    () => Math.max(1, ...breakdown.map((item) => item.count)),
    [breakdown]
  );

  return (
    <Box sx={styles.container}>
      <Stack alignItems="center" spacing={0.75} sx={styles.average}>
        <Typography sx={{ fontSize: 32, fontWeight: 700, lineHeight: 1.2 }}>
          {formatRating(ratingsAverage)}
        </Typography>

        <Rating value={ratingsAverage} precision={0.1} readOnly size="small" />

        <Typography variant="body2" color="text.secondary" noWrap>
          {ratingsCount} recenzii
        </Typography>
      </Stack>

      <Stack
        spacing={1}
        sx={{ flex: 1, minWidth: 0 }}
        role="group"
        aria-label="Filtrează după rating"
      >
        {sortedBreakdown.map((item) => (
          <ReviewSummaryCheckbox
            key={item.rating}
            rating={item.rating}
            progress={item.count / maxCount}
            count={item.count}
            isEnabled={isEnabled}
            isChecked={selectedRatings.has(item.rating)}
            onTap={() => onRatingClick(item.rating)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default memo(ReviewsSummarySection);

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    px: 2,
    mt: 5,
    mb: 2.5,
    boxSizing: "border-box",
    width: "100%",
  },
  average: {
    minWidth: 80,
    flexShrink: 0,
  },
} satisfies Record<string, SxProps<Theme>>;
