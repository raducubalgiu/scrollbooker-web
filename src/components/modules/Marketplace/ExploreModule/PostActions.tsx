import { Box, Typography } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import {
  PostCounters,
  PostUser,
  PostUserActions,
} from "@/ts/models/social/Post";

type PostActionsProps = {
  user: PostUser;
  counters: PostCounters;
  userActions: PostUserActions;
};

const PostActions = ({ user, counters, userActions }: PostActionsProps) => {
  console.log("counters", counters);
  console.log("userActions", userActions);

  const actions = [
    {
      key: "like",
      icon: <FavoriteIcon fontSize="large" sx={{ color: "text.primary" }} />,
      count: 120,
    },
    {
      key: "comments",
      icon: <TextsmsIcon fontSize="large" sx={{ color: "text.primary" }} />,
      count: 45,
    },
    {
      key: "save",
      icon: <BookmarkIcon fontSize="large" sx={{ color: "text.primary" }} />,
      count: 30,
    },
    {
      key: "share",
      icon: (
        <IosShareRoundedIcon fontSize="large" sx={{ color: "text.primary" }} />
      ),
      count: 10,
    },
  ];
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
      {actions.map((action) => (
        <Box key={action.key}>
          <Box
            key={action.key}
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              bgcolor: "secondary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "common.white",
              cursor: "pointer",
            }}
          >
            {action.icon}
          </Box>

          <Typography
            variant="h6"
            textAlign="center"
            fontWeight={600}
            sx={{ fontSize: 17 }}
          >
            {action.count}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PostActions;
