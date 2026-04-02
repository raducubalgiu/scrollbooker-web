import { Box, Skeleton, Typography } from "@mui/material";
import React, { act, useMemo } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { PostCounters, PostUserActions } from "@/ts/models/social/Post";

type PostActionsProps = {
  isLoading: boolean;
  counters: PostCounters | undefined;
  userActions: PostUserActions | undefined;
};

enum PostActionEnum {
  LIKE,
  COMMENT,
  BOOKMARK,
  SHARE,
}

type CounterButtonType = {
  key: PostActionEnum;
  icon: React.ReactNode;
  count?: number | string;
};

const PostActions = ({
  counters,
  userActions,
  isLoading = false,
}: PostActionsProps) => {
  const { is_liked, is_bookmarked } = userActions || {};

  const actions: CounterButtonType[] = useMemo(
    () => [
      {
        key: PostActionEnum.LIKE,
        icon: (
          <FavoriteIcon
            fontSize="large"
            sx={{ color: is_liked ? "error.main" : "text.primary" }}
          />
        ),
        count: counters?.like_count ?? "-",
      },
      {
        key: PostActionEnum.COMMENT,
        icon: <TextsmsIcon fontSize="large" sx={{ color: "text.primary" }} />,
        count: counters?.comment_count ?? "-",
      },
      {
        key: PostActionEnum.BOOKMARK,
        icon: (
          <BookmarkIcon
            fontSize="large"
            sx={{ color: is_bookmarked ? "primary.main" : "text.primary" }}
          />
        ),
        count: counters?.bookmark_count ?? "-",
      },
      {
        key: PostActionEnum.SHARE,
        icon: (
          <IosShareRoundedIcon
            fontSize="large"
            sx={{ color: "text.primary" }}
          />
        ),
      },
    ],
    [counters, is_liked, is_bookmarked]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        pb: 1,
        alignSelf: { xs: "flex-end", lg: "flex-end" },
      }}
    >
      {isLoading &&
        actions.map((action) => (
          <Box
            key={action.key}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Skeleton variant="circular" width={60} height={60} />
            {action.count !== undefined && <Box height={20} sx={{ mt: 0.5 }} />}
          </Box>
        ))}

      {!isLoading &&
        actions.map((action) => (
          <Box key={action.key}>
            <Box key={action.key} sx={styles.container}>
              {action.icon}
            </Box>

            {action.count !== undefined && (
              <Typography
                variant="h6"
                textAlign="center"
                fontWeight={600}
                sx={{ fontSize: 17 }}
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
  container: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    bgcolor: "secondary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "common.white",
    cursor: "pointer",
  },
};
