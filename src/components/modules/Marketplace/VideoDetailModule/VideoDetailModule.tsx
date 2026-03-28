"use client";

import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useRouter } from "next/navigation";

type ProfileVideoDetailPageProps = {
  username: string;
  videoId: number;
  tab?: string | null | undefined;
};

type CommentItem = {
  id: string;
  username: string;
  text: string;
  timeAgo: string;
};

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

export default function VideoDetailModule({
  username,
  videoId,
  tab,
}: ProfileVideoDetailPageProps) {
  const router = useRouter();

  const handleClose = React.useCallback(() => {
    router.replace(`/profile/${username}${tab ? `?tab=${tab}` : ""}`);
  }, [router]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          lg: "minmax(0, 1fr) minmax(480px, 640px)",
        },
      }}
    >
      <VideoStage username={username} videoId={videoId} onClose={handleClose} />

      <RightSidebar username={username} comments={MOCK_COMMENTS} />
    </Box>
  );
}

type VideoStageProps = {
  username: string;
  videoId: number;
  onClose: () => void;
};

function VideoStage({ username, videoId, onClose }: VideoStageProps) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "60vh", lg: "100vh" },
        bgcolor: "#0B0B0B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <IconButton
        onClick={onClose}
        size="large"
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 2,
          bgcolor: "rgba(255,255,255,0.10)",
          color: "common.white",
          "&:hover": {
            bgcolor: "rgba(255,255,255,0.18)",
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          right: 16,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          display: { xs: "none", md: "flex" },
        }}
      >
        <IconButton
          size="large"
          sx={{
            bgcolor: "rgba(255,255,255,0.10)",
            color: "common.white",
          }}
        >
          <KeyboardArrowUpRoundedIcon />
        </IconButton>

        <IconButton
          size="large"
          sx={{
            bgcolor: "rgba(255,255,255,0.10)",
            color: "common.white",
          }}
        >
          <KeyboardArrowDownRoundedIcon />
        </IconButton>
      </Stack>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            aspectRatio: "9 / 16",
            borderRadius: { xs: 0, sm: 3 },
            overflow: "hidden",
            bgcolor: "grey.900",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 80px rgba(0,0,0,0.45)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          />

          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              size="large"
              sx={{
                width: 72,
                height: 72,
                bgcolor: "rgba(255,255,255,0.16)",
                color: "common.white",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.22)",
                },
              }}
            >
              <PlayArrowRoundedIcon sx={{ fontSize: 42 }} />
            </IconButton>
          </Box>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                flex: 1,
                height: 4,
                borderRadius: 999,
                bgcolor: "rgba(255,255,255,0.18)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: "35%",
                  height: "100%",
                  bgcolor: "common.white",
                }}
              />
            </Box>

            <IconButton
              size="large"
              sx={{
                color: "common.white",
                bgcolor: "rgba(255,255,255,0.10)",
              }}
            >
              <VolumeUpOutlinedIcon />
            </IconButton>
          </Stack>

          <Box
            sx={{
              position: "absolute",
              top: 16,
              left: 16,
              zIndex: 2,
              px: 1.25,
              py: 0.75,
              borderRadius: 999,
              bgcolor: "rgba(0,0,0,0.45)",
              color: "common.white",
            }}
          >
            <Typography variant="caption" fontWeight={600}>
              @{username} • video #{videoId}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

type RightSidebarProps = {
  username: string;
  comments: CommentItem[];
};

function RightSidebar({ username, comments }: RightSidebarProps) {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        display: { xs: "none", lg: "block" },
        minHeight: { xs: "auto", lg: "100vh" },
        borderLeft: { lg: "1px solid" },
        borderColor: "divider",
        bgcolor: "background.paper",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 48, height: 48 }}>
            {username.slice(0, 1).toUpperCase()}
          </Avatar>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              @{username}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              Nume User • 1d ago
            </Typography>
          </Box>

          <Button variant="contained" disableElevation>
            Follow
          </Button>
        </Stack>

        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">
            Aici vine descrierea videoclipului. Poți pune caption, hashtags,
            locație, eventual servicii sau produse asociate.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            #scrollbooker #video #booking
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={2.5}
          alignItems="center"
          sx={{ mt: 3, flexWrap: "wrap", rowGap: 1.5 }}
        >
          <Reaction icon={<FavoriteBorderIcon />} value="48" />
          <Reaction icon={<ChatBubbleOutlineIcon />} value="0" />
          <Reaction icon={<BookmarkBorderIcon />} value="3" />
          <Reaction icon={<ShareIcon />} value="12" />
        </Stack>
      </Box>

      <Divider />

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
        <Typography variant="subtitle2" fontWeight={700}>
          Comments ({comments.length})
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Creator videos
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
        <Stack spacing={2}>
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </Stack>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ width: 36, height: 36 }}>R</Avatar>

          <TextField fullWidth size="small" placeholder="Add comment..." />

          <Button variant="contained" disableElevation>
            Send
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

type ReactionProps = {
  icon: React.ReactNode;
  value: string;
};

function Reaction({ icon, value }: ReactionProps) {
  return (
    <Stack direction="row" spacing={0.75} alignItems="center">
      <IconButton
        sx={{
          width: 40,
          height: 40,
          bgcolor: "action.hover",
        }}
      >
        {icon}
      </IconButton>

      <Typography variant="body2" fontWeight={600}>
        {value}
      </Typography>
    </Stack>
  );
}

type CommentCardProps = {
  comment: CommentItem;
};

function CommentCard({ comment }: CommentCardProps) {
  return (
    <Stack direction="row" spacing={1.25} alignItems="flex-start">
      <Avatar sx={{ width: 36, height: 36 }}>
        {comment.username.slice(0, 1).toUpperCase()}
      </Avatar>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
          <Typography variant="body2" fontWeight={700}>
            @{comment.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {comment.timeAgo}
          </Typography>
        </Stack>

        <Typography variant="body2">{comment.text}</Typography>
      </Box>
    </Stack>
  );
}
