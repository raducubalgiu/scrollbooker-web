export type ReviewsSummaryType = {
  ratings_average: number;
  ratings_count: number;
  breakdown: RatingBreakdownType[];
};

export type RatingBreakdownType = {
  rating: number;
  count: number;
};

export type ReviewsSummaryResponse = ReviewsSummaryType;
