import {
  PostAnalyticsSourceBreakdownItem,
  PostAnalyticsSourceEnum,
} from "@/ts/models/social/PostAnalyticsSummary";

const SOURCE_ORDER: PostAnalyticsSourceEnum[] = [
  "explore_feed",
  "following_feed",
  "search_video_feed",
  "post_detail",
  "bookmark_post_detail",
  "video_reviews",
  "other",
];

const SOURCE_LABELS: Record<PostAnalyticsSourceEnum, string> = {
  explore_feed: "Explorează",
  following_feed: "Urmărești",
  search_video_feed: "Căutare",
  post_detail: "Din profil",
  bookmark_post_detail: "Din profil",
  video_reviews: "Recenzii video",
  other: "Altele",
};

export type GroupedSource = {
  label: string;
  viewsCount: number;
};

export const groupSourceBreakdown = (
  breakdown: PostAnalyticsSourceBreakdownItem[]
): GroupedSource[] => {
  const groups = new Map<string, { viewsCount: number; minOrdinal: number }>();

  breakdown.forEach(({ source, views_count }) => {
    const label = SOURCE_LABELS[source] ?? SOURCE_LABELS.other;
    const ordinal = SOURCE_ORDER.indexOf(source);
    const existing = groups.get(label);

    if (existing) {
      existing.viewsCount += views_count;
      existing.minOrdinal = Math.min(existing.minOrdinal, ordinal);
    } else {
      groups.set(label, { viewsCount: views_count, minOrdinal: ordinal });
    }
  });

  return Array.from(groups.entries())
    .sort(([, a], [, b]) => a.minOrdinal - b.minOrdinal)
    .map(([label, { viewsCount }]) => ({ label, viewsCount }));
};
