import { Theme } from "@mui/material";
import { AppointmentChannelEnum } from "@/ts/models/booking/appointment/AppointmentChannelEnum";

const CHANNEL_LABEL_KEYS: Record<string, string> = {
  own_client: "channelOwnClient",
  scroll_booker: "channelScrollBooker",
};

export function getChannelColor(
  channel: string,
  businessShortDomain: string | null | undefined,
  theme: Theme
): string {
  if (channel !== AppointmentChannelEnum.OWN_CLIENT) {
    return theme.palette.primary.main;
  }

  const domain = businessShortDomain?.toLowerCase();
  if (domain && domain in theme.palette) {
    const customColorObj = theme.palette[
      domain as keyof typeof theme.palette
    ] as typeof theme.palette.primary;

    if (customColorObj?.main) {
      return customColorObj.main;
    }
  }

  return theme.palette.primary.main;
}

const SOURCE_LABEL_KEYS: Record<string, string> = {
  book_again: "sourceBookAgain",
  explore_feed: "sourceExploreFeed",
  following_feed: "sourceFollowingFeed",
  profile: "sourceProfile",
  profile_grid_post_detail: "sourceProfileGridPostDetail",
  profile_bookmarks_post_detail: "sourceProfileBookmarksPostDetail",
  search: "sourceSearch",
  search_business_profile: "sourceSearchBusinessProfile",
};

export function getChannelLabelKey(channel: string): string | undefined {
  return CHANNEL_LABEL_KEYS[channel];
}

export function getSourceLabelKey(source: string): string | undefined {
  return SOURCE_LABEL_KEYS[source];
}

const ENGAGEMENT_SOURCE_LABEL_KEYS: Record<string, string> = {
  search_video_feed: "engagementSourceSearchVideoFeed",
  explore_feed: "engagementSourceExploreFeed",
  following_feed: "engagementSourceFollowingFeed",
  post_detail: "engagementSourcePostDetail",
  bookmark_post_detail: "engagementSourceBookmarkPostDetail",
  video_reviews: "engagementSourceVideoReviews",
  search: "engagementSourceSearch",
  business_profile: "engagementSourceBusinessProfile",
  other: "engagementSourceOther",
};

export function getEngagementSourceLabelKey(source: string): string | undefined {
  return ENGAGEMENT_SOURCE_LABEL_KEYS[source];
}
