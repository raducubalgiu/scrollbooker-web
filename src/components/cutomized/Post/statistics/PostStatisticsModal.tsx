"use client";

import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Modal from "@/components/core/Modal/Modal";
import PostStatisticsBody from "./PostStatisticsBody";

type PostStatisticsModalProps = {
  open: boolean;
  postId: number | null;
  onClose: () => void;
};

const PostStatisticsModal = ({
  open,
  postId,
  onClose,
}: PostStatisticsModalProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!isDesktop) return null;

  return (
    <Modal
      title="Statistici postare"
      open={open}
      handleClose={onClose}
      maxWidth="sm"
      fullWidth
      dividers={false}
    >
      <PostStatisticsBody postId={postId} enabled={open} />
    </Modal>
  );
};

export default PostStatisticsModal;
