import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import React from "react";

type CommentItem = {
  id: string;
  username: string;
  text: string;
  timeAgo: string;
};

type CommentCardProps = {
  comment: CommentItem;
};

function CommentCard({ comment }: CommentCardProps) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Avatar sx={{ width: 40, height: 40 }}>
        {comment.username.slice(0, 1).toUpperCase()}
      </Avatar>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography fontWeight={700}>@{comment.username}</Typography>
          <Typography variant="caption" color="text.secondary">
            {comment.timeAgo}
          </Typography>
        </Stack>

        <Typography>{comment.text}</Typography>
      </Box>
    </Stack>
  );
}

const MOCK_COMMENTS: CommentItem[] = [
  {
    id: "1",
    username: "alex",
    text: "Foarte tare ideea 🔥",
    timeAgo: "2h",
  },
  {
    id: "2",
    username: "maria",
    text: "Îmi place mult cum arată pagina.",
    timeAgo: "1h",
  },
  {
    id: "3",
    username: "david",
    text: "Asta arată chiar clean.",
    timeAgo: "35m",
  },
];

const VideoComments = () => {
  return (
    <>
      <Box
        sx={{
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Typography fontWeight={700}>
          Commentarii ({MOCK_COMMENTS.length})
        </Typography>
      </Box>

      <Divider />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: 3,
          py: 2,
        }}
      >
        <Stack spacing={2.5}>
          {MOCK_COMMENTS.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 45, height: 45 }}>R</Avatar>

          <TextField
            fullWidth
            size="medium"
            placeholder="Add comment..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 50,
                bgcolor: "action.hover",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
          />

          <IconButton sx={{ bgcolor: "primary.main" }}>
            <ArrowUpwardOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};

export default VideoComments;
