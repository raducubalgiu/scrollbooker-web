import {
  Box,
  Stack,
  Typography,
  alpha,
  Avatar,
  Badge,
  ButtonBase,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import {
  PostCounters,
  PostUser,
  PostUserActions,
} from "@/ts/models/social/Post";
import { formatRating } from "@/utils/formatters";
import { useCallback } from "react";

import LikeIconSolid from "@/assets/icons/ic_heart_solid.svg";
import ClipboardIconSolid from "@/assets/icons/ic_clipboard_solid.svg";
import CommentIconSolid from "@/assets/icons/ic_comment_solid.svg";
import BookmarkIconSolid from "@/assets/icons/ic_bookmark_solid.svg";
import MoreIcon from "@/assets/icons/ic_elipsis-horizontal.svg";

type PostActionsProps = {
  user: PostUser;
  isSavingLike: boolean;
  isSavingBookmark: boolean;
  isVideoReview: boolean;
  counters: PostCounters;
  userActions: PostUserActions;
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
  userActions,
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
                sx={{ fontSize: 15, fontWeight: 600, color: "common.black" }}
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
          <ButtonBase
            disabled={isSavingLike}
            onClick={onLike}
            sx={styles.actionButton}
          >
            <Box
              sx={{
                width: 32.5,
                height: 32.5,
                backgroundColor: userActions.is_liked
                  ? "error.main"
                  : "common.white",
                maskImage: `url(${LikeIconSolid.src})`,
                WebkitMaskImage: `url(${LikeIconSolid.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </ButtonBase>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.like_count}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <ButtonBase onClick={() => {}} sx={styles.actionButton}>
            <Box
              sx={{
                width: 32.5,
                height: 32.5,
                backgroundColor: "currentColor",
                maskImage: `url(${ClipboardIconSolid.src})`,
                WebkitMaskImage: `url(${ClipboardIconSolid.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </ButtonBase>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {user.ratings_count}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          <ButtonBase onClick={() => {}} sx={styles.actionButton}>
            <Box
              sx={{
                width: 32.5,
                height: 32.5,
                backgroundColor: "currentColor",
                maskImage: `url(${CommentIconSolid.src})`,
                WebkitMaskImage: `url(${CommentIconSolid.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </ButtonBase>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.comment_count}
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={0.5}>
          <ButtonBase
            disabled={isSavingBookmark}
            onClick={onBookmark}
            sx={styles.actionButton}
          >
            <Box
              sx={{
                width: 32.5,
                height: 32.5,
                backgroundColor: userActions.is_bookmarked
                  ? "rating.main"
                  : "common.white",
                maskImage: `url(${BookmarkIconSolid.src})`,
                WebkitMaskImage: `url(${BookmarkIconSolid.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
          </ButtonBase>
          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ color: "#fff", fontSize: 13 }}
          >
            {counters.bookings_count}
          </Typography>
        </Stack>

        <ButtonBase onClick={() => {}} sx={styles.actionButton}>
          <Box
            sx={{
              width: 32.5,
              height: 32.5,
              backgroundColor: "currentColor",
              maskImage: `url(${MoreIcon.src})`,
              WebkitMaskImage: `url(${MoreIcon.src})`,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </ButtonBase>
      </Stack>
    </Stack>
  );
}

const styles = {
  actionButton: {
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
    backgroundColor: "common.white",
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
