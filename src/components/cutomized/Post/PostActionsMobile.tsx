import {
  Box,
  Stack,
  IconButton,
  Typography,
  CircularProgress,
  alpha,
  Avatar,
  Badge,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ClipboardCheckIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarIcon from "@mui/icons-material/Star";
import { PostCounters, PostUser } from "@/ts/models/social/Post";
import { formatRating } from "@/utils/formatters";
import { useCallback } from "react";

type PostActionsProps = {
  user: PostUser;
  isSavingLike: boolean;
  isSavingBookmark: boolean;
  isVideoReview: boolean;
  counters: PostCounters;
  onLike: () => void;
  onBookmark: () => void;
  onNavigateToUser: () => void;
};

export default function PostActionsMobile({
  user,
  isSavingLike,
  isSavingBookmark,
  isVideoReview,
  counters,
  onLike,
  onBookmark,
  onNavigateToUser,
}: PostActionsProps) {
  const user_avatar = useCallback(() => {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          !isVideoReview && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={styles.badgeContent}
              gap={0.25}
            >
              <StarIcon sx={{ fontSize: 18, color: "rating.main" }} />
              <Typography
                sx={{ fontSize: 15, fontWeight: 600, color: "text.primary" }}
              >
                {formatRating(user.ratings_average)}
              </Typography>
            </Stack>
          )
        }
        sx={styles.badge}
      >
        <Avatar sx={styles.avatar} src={user.avatar ?? ""} />
      </Badge>
    );
  }, [user.ratings_average, user.avatar, isVideoReview]);

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Box
        onClick={onNavigateToUser}
        sx={{
          cursor: "pointer",
          position: "relative",
          mb: isVideoReview ? 1.5 : 3.5,
        }}
      >
        {user_avatar()}
      </Box>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Stack alignItems="center">
          <IconButton
            disabled={isSavingLike}
            onClick={onLike}
            sx={styles.actionButton}
          >
            {isSavingLike ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              <FavoriteIcon
                sx={{
                  fontSize: 35,
                  color: "#fff",
                }}
              />
            )}
          </IconButton>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.like_count}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <IconButton onClick={() => {}} sx={styles.actionButton}>
            <ClipboardCheckIcon sx={{ fontSize: 35, color: "#fff" }} />
          </IconButton>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {user.ratings_count}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <IconButton onClick={() => {}} sx={styles.actionButton}>
            <TextsmsIcon sx={{ fontSize: 35, color: "#fff" }} />
          </IconButton>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.comment_count}
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={0.5}>
          <IconButton
            disabled={isSavingBookmark}
            onClick={onBookmark}
            sx={styles.actionButton}
          >
            <BookmarkIcon
              sx={{
                fontSize: 35,
                color: "#fff",
              }}
            />
          </IconButton>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.bookings_count}
          </Typography>
        </Stack>

        <IconButton onClick={() => {}} sx={styles.actionButton}>
          <MoreHorizIcon sx={{ fontSize: 35, color: "#fff" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
}

const styles = {
  actionButton: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    color: "#fff",
    transition: "all 0.15ms ease",
    "&:hover": {
      backgroundColor: alpha("#000", 0.45),
    },
    "&.Mui-disabled": {
      backgroundColor: alpha("#000", 0.15),
      color: alpha("#fff", 0.3),
    },
  },
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "background.paper",
    px: 0.75,
    py: 0.25,
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: 55,
    height: 55,
    border: 1,
    borderColor: "divider",
  },
};
