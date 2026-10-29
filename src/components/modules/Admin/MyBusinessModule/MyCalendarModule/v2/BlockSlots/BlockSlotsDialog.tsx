"use client";

import React from "react";
import {
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/components/core/Modal/Modal";
import BlockSlotsContent, {
  BlockSlotsContentProps,
  getBlockSlotsTitle,
} from "./BlockSlotsContent";

type BlockSlotsDialogProps = BlockSlotsContentProps & {
  open: boolean;
  onClose: () => void;
};

const BlockSlotsDialog = ({ open, onClose, ...contentProps }: BlockSlotsDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const title = getBlockSlotsTitle(contentProps.slotLabels.length);

  if (!isMobile) {
    return (
      <Modal
        open={open}
        handleClose={onClose}
        title={title}
        maxWidth="sm"
        fullWidth
        dividers={false}
      >
        <BlockSlotsContent {...contentProps} />
      </Modal>
    );
  }

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
        justifyContent="space-between"
        sx={{ px: 2, py: 1.5 }}
      >
        <Typography fontWeight={700}>{title}</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Stack>
      <Divider />

      <BlockSlotsContent {...contentProps} />
    </Drawer>
  );
};

export default BlockSlotsDialog;

const styles = {
  paper: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
  },
} as const;
