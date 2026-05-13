import React, { useMemo, useState } from "react";
import {
  Box,
  IconButton,
  Skeleton,
  Typography,
  Theme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import { PostCounters, PostUserActions } from "@/ts/models/social/Post";

type PostActionsProps = {
  isLoading: boolean;
  counters?: PostCounters | undefined;
  userActions?: PostUserActions | undefined;
  onLike: () => void;
  onCommentClick: () => void;
  onBookmarkClick: () => void;
  onShareClick: () => void;
  onOptionsClick: () => void;
  onDeleteClick?: () => void;
  onReportClick?: () => void;
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
  onLike,
  onCommentClick,
  onBookmarkClick,
  onShareClick,
  onOptionsClick,
  onDeleteClick,
  onReportClick,
}: PostActionsProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleOptionsOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onOptionsClick();
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

  const getActionStyles = (actionId: string, theme: Theme) => {
    const isOptions = actionId === "options";
    const size = isOptions ? 40 : 60;

    return {
      width: size,
      height: size,
      borderRadius: "50%",
      bgcolor: isOptions
        ? "transparent"
        : theme.palette.mode === "light"
          ? "background.default"
          : "background.paper",
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
            sx={(theme) => getActionStyles(action.id, theme)}
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

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleOptionsClose}
        onClick={handleOptionsClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              borderRadius: 3,
              minWidth: 160,
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            },
          },
        }}
      >
        <MenuItem onClick={() => onReportClick?.()} sx={{ py: 1.2 }}>
          <ListItemIcon>
            <ReportOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Raportează"
            slotProps={{
              primary: {
                variant: "body2",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>

        <MenuItem
          onClick={() => onDeleteClick?.()}
          sx={{ color: "error.main", py: 1.2 }}
        >
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Șterge"
            slotProps={{
              primary: {
                variant: "body2",
                fontWeight: 500,
              },
            }}
          />
        </MenuItem>
      </Menu>
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
