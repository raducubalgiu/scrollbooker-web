export interface ReviewsSummary {
  ratings_average: number;
  ratings_count: number;
  breakdown: RatingBreakdown[];
}

export interface RatingBreakdown {
  rating: number;
  count: number;
}
