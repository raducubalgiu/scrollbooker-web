import React from "react";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import { StaticImageData } from "next/image";

import LikeIconSolid from "@/assets/icons/ic_heart_solid.svg";
import LikeIconOutline from "@/assets/icons/ic_heart_outlined.svg";
import CommentIconOutline from "@/assets/icons/ic_comment_outline.svg";
import BookmarkIconSolid from "@/assets/icons/ic_bookmark_solid.svg";
import BookmarkIconOutline from "@/assets/icons/ic_bookmark_outline.svg";
import MoreIcon from "@/assets/icons/ic_elipsis-horizontal.svg";
import ShareIcon from "@/assets/icons/ic_share_new.svg";

import { PostActionKey, usePostActions } from "./usePostActions";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";
import { PostActionsProps } from "./postActionTypes";

type PostIconSet = { active?: StaticImageData; inactive: StaticImageData };

const POST_ICONS: Partial<Record<PostActionKey, PostIconSet>> = {
  like: { active: LikeIconSolid, inactive: LikeIconOutline },
  comment: { inactive: CommentIconOutline },
  bookmark: { active: BookmarkIconSolid, inactive: BookmarkIconOutline },
  share: { inactive: ShareIcon },
  options: { inactive: MoreIcon },
};

const DESKTOP_KEYS: PostActionKey[] = [
  "like",
  "comment",
  "bookmark",
  "options",
  "share",
];

const getButtonStyles = (key: PostActionKey) => ({
  width: key === "options" ? 40 : 60,
  height: key === "options" ? 40 : 60,
  borderRadius: "50%",
  bgcolor: key === "options" ? "transparent" : "background.paper",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const PostActions = ({
  user,
  counters,
  userActions,
  isOwnPost,
  loaders: { isLoading, isSavingLike, isSavingBookmark, isLoadingDelete },
  callbacks: {
    onLike,
    onBookmarkClick,
    onCommentClick,
    onShareClick,
    onDeleteClick,
    onReportClick,
  },
}: PostActionsProps) => {
  const { actions } = usePostActions({
    user,
    counters,
    userActions,
    isSavingLike,
    isSavingBookmark,
    isOwnPost,
    isLoadingDelete,
    onLike,
    onBookmark: onBookmarkClick,
    onCommentClick,
    onShareClick,
    onDeleteClick,
    onReportClick,
  });

  const desktopActions = actions.filter((a) => DESKTOP_KEYS.includes(a.key));

  if (isLoading) {
    return (
      <Box sx={styles.root}>
        {desktopActions.map((action) => (
          <Box key={action.key} sx={styles.actionItem}>
            <Skeleton variant="circular" width={60} height={60} />
            {action.count !== undefined && (
              <Skeleton
                variant="text"
                width={28}
                height={24}
                sx={{ mt: 0.5 }}
              />
            )}
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      {desktopActions.map(({ key, count, isActive, activeColor, onClick }) => {
        const iconSet = POST_ICONS[key];
        if (!iconSet) return null;
        const icon =
          isActive && iconSet.active ? iconSet.active : iconSet.inactive;

        return (
          <Box key={key} sx={styles.actionItem}>
            <IconButton
              onClick={onClick}
              disableRipple
              sx={getButtonStyles(key)}
            >
              <CustomSvg
                src={icon}
                size={32.5}
                sx={{
                  backgroundColor:
                    isActive && activeColor ? activeColor : "text.primary",
                }}
              />
            </IconButton>

            {count !== undefined && (
              <Typography
                variant="h6"
                textAlign="center"
                fontWeight={600}
                sx={styles.count}
              >
                {count}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default PostActions;

const styles = {
  root: {
    display: { xs: "none", lg: "flex" },
    flexDirection: "column",
    gap: 1,
    pb: 1,
    alignSelf: "flex-end",
  },
  actionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  count: {
    mt: 0.5,
    fontSize: 17,
  },
};
