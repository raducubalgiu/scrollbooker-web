export type PostAnalyticsSourceEnum =
  | "explore_feed"
  | "following_feed"
  | "search_video_feed"
  | "post_detail"
  | "bookmark_post_detail"
  | "video_reviews"
  | "other";

export type PostAnalyticsSourceBreakdownItem = {
  source: PostAnalyticsSourceEnum;
  views_count: number;
};

export type PostAnalyticsSummary = {
  post_id: number;
  thumbnail_url: string | null;
  views_count: number;
  unique_viewers_count: number;
  watch_time_ms: number;
  average_watch_time_ms: number;
  completions_count: number;
  like_count: number;
  comment_count: number;
  share_count: number;
  bookmark_count: number;
  source_breakdown: PostAnalyticsSourceBreakdownItem[];
};
