"use client";

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import PostStatisticsBody from "./PostStatisticsBody";

type PostStatisticsDrawerProps = {
  open: boolean;
  postId: number | null;
  onClose: () => void;
};

const PostStatisticsDrawer = ({
  open,
  postId,
  onClose,
}: PostStatisticsDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (!isMobile) return null;

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paper } }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={styles.header}
      >
        <Typography fontWeight={800} fontSize={16}>
          Statistici postare
        </Typography>

        <IconButton onClick={onClose} size="small" sx={styles.closeButton}>
          <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
        </IconButton>
      </Stack>

      <Box sx={styles.scrollArea}>
        <PostStatisticsBody postId={postId} enabled={open} />
      </Box>
    </Drawer>
  );
};

export default PostStatisticsDrawer;

const styles = {
  paper: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header: {
    pt: 2,
    pb: 1.5,
    mx: 2,
    borderBottom: 1,
    borderColor: "divider",
    flexShrink: 0,
  },
  closeButton: {
    position: "absolute",
    right: 0,
    color: "text.secondary",
  },
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    p: 2,
    WebkitOverflowScrolling: "touch",
  },
};
