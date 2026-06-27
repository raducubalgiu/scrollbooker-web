import React, { useMemo, useState } from "react";
import { Box, IconButton, Skeleton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { PostCounters, PostUserActions } from "@/ts/models/social/Post";
import MoreOptionsMenu from "./MoreOptionsMenu";

type PostActionsProps = {
  isLoading: boolean;
  isOwnPost: boolean;
  counters?: PostCounters | undefined;
  userActions?: PostUserActions | undefined;
  onLike: () => void;
  onCommentClick: () => void;
  onBookmarkClick: () => void;
  onShareClick: () => void;
  onDeleteClick: () => void;
  isLoadingDelete: boolean;
  onReportClick: () => void;
};

type PostActionItem = {
  id: "like" | "comment" | "bookmark" | "share" | "options";
  icon: React.ReactNode;
  count?: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const PostActions = ({
  counters,
  userActions,
  isLoading = false,
  isOwnPost,
  onLike,
  onCommentClick,
  onBookmarkClick,
  onShareClick,
  onDeleteClick,
  isLoadingDelete,
  onReportClick,
}: PostActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOptionsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

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
                ? "rating.main"
                : "text.primary",
            }}
          />
        ),
        count: counters?.bookmark_count ?? 0,
        onClick: onBookmarkClick,
      },
      {
        id: "options",
        icon: <MoreHorizIcon fontSize="large" sx={{ color: "text.primary" }} />,
        onClick: handleOptionsOpen,
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

  const getActionStyles = (actionId: string) => {
    const isOptions = actionId === "options";
    const size = isOptions ? 40 : 60;

    return {
      width: size,
      height: size,
      borderRadius: "50%",
      bgcolor: isOptions ? "transparent" : "background.paper",
      color: "text.primary",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  };

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
          <IconButton
            onClick={action.onClick}
            disableRipple
            sx={() => getActionStyles(action.id)}
          >
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

      <MoreOptionsMenu
        anchorEl={anchorEl}
        isMenuOpen={isMenuOpen}
        isOwnPost={isOwnPost}
        handleOptionsClose={handleOptionsClose}
        onReportClick={onReportClick}
        onDeleteClick={onDeleteClick}
        isLoadingDelete={isLoadingDelete}
      />
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
    alignSelf: { xs: "flex-end", lg: "flex-end" },
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
