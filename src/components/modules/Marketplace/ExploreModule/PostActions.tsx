import React, { useMemo } from "react";
import { Box, IconButton, Skeleton, Typography, Theme } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { PostCounters, PostUserActions } from "@/ts/models/social/Post";

type PostActionsProps = {
  isLoading: boolean;
  counters?: PostCounters | undefined;
  userActions?: PostUserActions | undefined;
  onLike: () => void;
  onCommentClick: () => void;
  onBookmarkClick: () => void;
  onShareClick: () => void;
};

type PostActionItem = {
  id: "like" | "comment" | "bookmark" | "share";
  icon: React.ReactNode;
  count?: number;
  onClick: () => void;
};

const PostActions = ({
  counters,
  userActions,
  isLoading = false,
  onLike,
  onCommentClick,
  onBookmarkClick,
  onShareClick,
}: PostActionsProps) => {
  const actions = useMemo<PostActionItem[]>(
    () => [
      {
        id: "like",
        icon: (
          <FavoriteIcon
            fontSize="large"
            sx={{
              color: userActions?.is_liked ? "error.main" : "text.primary",
            }}
          />
        ),
        count: counters?.like_count ?? 0,
        onClick: onLike,
      },
      {
        id: "comment",
        icon: <TextsmsIcon fontSize="large" sx={{ color: "text.primary" }} />,
        count: counters?.comment_count ?? 0,
        onClick: onCommentClick,
      },
      {
        id: "bookmark",
        icon: (
          <BookmarkIcon
            fontSize="large"
            sx={{
              color: userActions?.is_bookmarked
                ? "primary.main"
                : "text.primary",
            }}
          />
        ),
        count: counters?.bookmark_count ?? 0,
        onClick: onBookmarkClick,
      },
      {
        id: "share",
        icon: (
          <IosShareRoundedIcon
            fontSize="large"
            sx={{ color: "text.primary" }}
          />
        ),
        onClick: onShareClick,
      },
    ],
    [
      counters?.bookmark_count,
      counters?.comment_count,
      counters?.like_count,
      onBookmarkClick,
      onCommentClick,
      onLike,
      onShareClick,
      userActions?.is_bookmarked,
      userActions?.is_liked,
    ]
  );

  if (isLoading) {
    return (
      <Box sx={styles.root}>
        {actions.map((action) => (
          <Box key={action.id} sx={styles.actionItem}>
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
      {actions.map((action) => (
        <Box key={action.id} sx={styles.actionItem}>
          <IconButton onClick={action.onClick} disableRipple sx={styles.button}>
            {action.icon}
          </IconButton>

          {action.count !== undefined && (
            <Typography
              variant="h6"
              textAlign="center"
              fontWeight={600}
              sx={styles.count}
            >
              {action.count}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PostActions;

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    pb: 1,
    alignSelf: { xs: "flex-end", lg: "flex-end" },
  },
  actionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    bgcolor: (theme: Theme) =>
      theme.palette.mode === "light"
        ? "background.default"
        : "background.paper",
    color: "common.white",
  },
  count: {
    mt: 0.5,
    fontSize: 17,
  },
};
