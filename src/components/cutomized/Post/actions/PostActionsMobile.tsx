import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { StaticImageData } from "next/image";

import LikeIconSolid from "@/assets/icons/ic_heart_solid.svg";
import ClipboardIconSolid from "@/assets/icons/ic_clipboard_solid.svg";
import CommentIconSolid from "@/assets/icons/ic_comment_solid.svg";
import BookmarkIconSolid from "@/assets/icons/ic_bookmark_solid.svg";
import ShareIcon from "@/assets/icons/ic_share.svg";
import { PostActionKey, usePostActions } from "./usePostActions";

import { formatRating } from "@/utils/formatters";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";
import { PostActionsProps } from "./postActionTypes";

const MOBILE_ICONS: Partial<Record<PostActionKey, StaticImageData>> = {
  like: LikeIconSolid,
  clipboard: ClipboardIconSolid,
  comment: CommentIconSolid,
  bookmark: BookmarkIconSolid,
  share: ShareIcon,
};

const MOBILE_KEYS: PostActionKey[] = [
  "like",
  "clipboard",
  "comment",
  "bookmark",
  "share",
];

export default function PostActionsMobile({
  user,
  counters,
  userActions,
  isOwnPost,
  isVideoReview,
  loaders: { isSavingLike, isSavingBookmark, isLoadingDelete },
  callbacks: {
    onLike,
    onCommentClick,
    onBookmarkClick,
    onShareClick,
    onDeleteClick,
    onReportClick,
    onNavigateToUser,
  },
}: PostActionsProps) {
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

  const mobileActions = actions.filter((a) => MOBILE_KEYS.includes(a.key));

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Box
        onClick={(e) => {
          e.stopPropagation();
          onNavigateToUser();
        }}
        sx={{
          cursor: "pointer",
          position: "relative",
          mb: isVideoReview ? 1.5 : 3.5,
        }}
      >
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
                  {formatRating(user?.ratings_average)}
                </Typography>
              </Stack>
            )
          }
          sx={styles.badge}
        >
          <Avatar sx={styles.avatar} src={user?.avatar ?? ""} />
        </Badge>
      </Box>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={0.5}
      >
        {mobileActions.map(
          ({ key, count, disabled, isActive, activeColor, onClick }) => {
            const icon = MOBILE_ICONS[key];
            if (!icon) return null;

            return (
              <Stack key={key} alignItems="center">
                <ButtonBase
                  disabled={disabled ?? false}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  sx={styles.actionButton}
                >
                  <CustomSvg
                    src={icon}
                    size={35}
                    sx={{
                      backgroundColor:
                        isActive && activeColor ? activeColor : "common.white",
                    }}
                  />
                </ButtonBase>
                <Typography
                  variant="caption"
                  fontWeight={600}
                  sx={{ color: "#fff", fontSize: 13 }}
                >
                  {count}
                </Typography>
              </Stack>
            );
          }
        )}
      </Stack>
    </Stack>
  );
}

const styles = {
  actionButton: {
    borderRadius: "50%",
    color: "#fff",
    transition: "all 0.15ms ease",
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
