import { useMemo, useState } from "react";
import {
  PostCounters,
  PostUserActions,
  PostUser,
} from "@/ts/models/social/Post";

type UsePostActionsProps = {
  user: PostUser | null;
  counters: PostCounters | null;
  userActions: PostUserActions | null;
  isSavingLike: boolean;
  isSavingBookmark: boolean;
  isLoadingDelete: boolean;
  isOwnPost: boolean;
  onLike: () => void;
  onBookmark: () => void;
  onCommentClick: () => void;
  onShareClick: () => void;
  onDeleteClick: () => void;
  onReportClick: () => void;
};

export type PostActionKey =
  | "like"
  | "clipboard"
  | "comment"
  | "bookmark"
  | "share"
  | "options";

export type PostAction = {
  key: PostActionKey;
  count?: number | undefined;
  disabled?: boolean | undefined;
  isActive?: boolean | undefined;
  activeColor?: string | undefined;
  onClick: () => void;
};

export const usePostActions = ({
  user,
  counters,
  userActions,
  isSavingLike = false,
  isSavingBookmark = false,
  isOwnPost,
  onLike,
  onBookmark,
  onCommentClick,
  onShareClick,
  onDeleteClick,
  onReportClick,
}: UsePostActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOptionsOpen = (event?: React.MouseEvent<HTMLElement>) => {
    setAnchorEl((event?.currentTarget as HTMLElement) ?? null);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const actions = useMemo<PostAction[]>(
    () => [
      {
        key: "like",
        count: counters?.like_count ?? 0,
        disabled: isSavingLike,
        isActive: userActions?.is_liked ?? false,
        activeColor: "error.main",
        onClick: onLike,
      },
      {
        key: "clipboard",
        count: user?.ratings_count,
        onClick: () => {},
      },
      {
        key: "comment",
        count: counters?.comment_count ?? 0,
        onClick: onCommentClick,
      },
      {
        key: "bookmark",
        count: counters?.bookings_count ?? counters?.bookmark_count ?? 0,
        disabled: isSavingBookmark,
        isActive: userActions?.is_bookmarked ?? false,
        activeColor: "rating.main",
        onClick: onBookmark,
      },
      {
        key: "options",
        onClick: () => handleOptionsOpen(),
      },
      {
        key: "share",
        onClick: onShareClick,
      },
    ],
    [
      counters,
      userActions,
      user?.ratings_count,
      isSavingLike,
      isSavingBookmark,
      onLike,
      onBookmark,
      onCommentClick,
      onShareClick,
    ]
  );

  return {
    actions,
    anchorEl,
    isMenuOpen,
    handleOptionsOpen,
    handleOptionsClose,
    moreMenuProps: {
      anchorEl,
      isMenuOpen,
      isOwnPost,
      handleOptionsClose,
      onReportClick,
      onDeleteClick,
    },
  };
};
