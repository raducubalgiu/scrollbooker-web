import {
  PostCounters,
  PostServiceDomain,
  PostUser,
  PostUserActions,
} from "@/ts/models/social/Post";

export type PostActionCallbacks = {
  onLike: () => void;
  onCommentClick: () => void;
  onBookmarkClick: () => void;
  onShareClick: () => void;
  onDeleteClick: () => void;
  onReportClick: () => void;
  onNavigateToUser: () => void;
};

export type PostActionLoaders = {
  isLoading: boolean;
  isSavingLike: boolean;
  isSavingBookmark: boolean;
  isLoadingDelete: boolean;
};

export type PostActionsProps = {
  user: PostUser | null;
  counters: PostCounters | null;
  userActions: PostUserActions | null;
  isOwnPost: boolean;
  isVideoReview?: boolean;
  serviceDomain?: PostServiceDomain | null;
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
};
