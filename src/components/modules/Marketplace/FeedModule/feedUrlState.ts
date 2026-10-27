import { AppRoutes } from "@/utils/routes";
import { FeedTabEnum } from "./FeedTabs";

export const LAST_FEED_URL_STORAGE_KEY = "lastFeedUrl";

export function getLastFeedUrl(): string {
  try {
    return (
      sessionStorage.getItem(LAST_FEED_URL_STORAGE_KEY) ?? AppRoutes.feed()
    );
  } catch {
    return AppRoutes.feed();
  }
}

export type FeedUrlState = {
  tab: FeedTabEnum;
  postId: number | null;
  serviceIds: Set<number>;
  onlyVideoReviews: boolean;
  onlyNearby: boolean;
};

const TAB_TO_PARAM: Record<FeedTabEnum, string> = {
  [FeedTabEnum.EXPLORE]: "explore",
  [FeedTabEnum.FOLLOWING]: "following",
};

const PARAM_TO_TAB: Record<string, FeedTabEnum> = {
  explore: FeedTabEnum.EXPLORE,
  following: FeedTabEnum.FOLLOWING,
};

export function parseFeedUrlState(params: URLSearchParams): FeedUrlState {
  const tab = PARAM_TO_TAB[params.get("tab") ?? ""] ?? FeedTabEnum.EXPLORE;

  const postIdParam = params.get("post_id");
  const postId = postIdParam !== null ? Number(postIdParam) : null;

  const serviceIdsParam = params.get("service_ids");
  const serviceIds = new Set(
    serviceIdsParam
      ? serviceIdsParam
          .split(",")
          .map(Number)
          .filter((n) => !Number.isNaN(n))
      : []
  );

  return {
    tab,
    postId: postId !== null && !Number.isNaN(postId) ? postId : null,
    serviceIds,
    onlyVideoReviews: params.get("only_video_reviews") === "1",
    onlyNearby: params.get("only_nearby") === "1",
  };
}

export function buildFeedUrl(state: FeedUrlState): string {
  const params = new URLSearchParams();
  params.set("tab", TAB_TO_PARAM[state.tab]);

  if (state.postId != null) {
    params.set("post_id", String(state.postId));
  }
  if (state.serviceIds.size > 0) {
    params.set("service_ids", Array.from(state.serviceIds).join(","));
  }
  if (state.onlyVideoReviews) {
    params.set("only_video_reviews", "1");
  }
  if (state.onlyNearby) {
    params.set("only_nearby", "1");
  }

  return `/feed?${params.toString()}`;
}
