import {
  PostCounters,
  PostServiceDomain,
  PostUser,
  PostUserActions,
} from "@/ts/models/social/Post";

export type PostActionCallbacks = {
  onLike: () => void;
  onCommentClick: () => void;
  onReviewsClick: () => void;
  onBookmarkClick: () => void;
  onShareClick: () => void;
  onOpenMoreOptions: () => void;
  onCloseMoreOptions: () => void;
  onStatisticsClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
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
  isMoreOpen?: boolean;
  loaders: PostActionLoaders;
  callbacks: PostActionCallbacks;
};
