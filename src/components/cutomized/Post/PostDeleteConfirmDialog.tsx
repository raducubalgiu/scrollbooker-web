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
import Modal from "@/components/core/Modal/Modal";
import PostDeleteConfirmContent from "./PostDeleteConfirmContent";

type PostDeleteConfirmDialogProps = {
  open: boolean;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const PostDeleteConfirmDialog = ({
  open,
  isLoading,
  onConfirm,
  onCancel,
}: PostDeleteConfirmDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onCancel}
        slotProps={{ paper: { sx: styles.drawer } }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={2}
          minHeight={30}
        >
          <Typography fontWeight={800} fontSize={16}>
            Șterge postarea
          </Typography>

          <IconButton
            onClick={onCancel}
            size="small"
            sx={{ position: "absolute", right: 0, color: "text.secondary" }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Stack>

        <Box sx={{ px: 2, pb: 2, pt: 2 }}>
          <PostDeleteConfirmContent
            isLoading={isLoading}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        </Box>
      </Drawer>
    );
  }

  return (
    <Modal
      title="Șterge postarea"
      open={open}
      handleClose={onCancel}
      maxWidth="xs"
      fullWidth
      dividers={false}
    >
      <Box sx={{ p: { xs: 1.5, lg: 1.5 } }}>
        <PostDeleteConfirmContent
          isLoading={isLoading}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      </Box>
    </Modal>
  );
};

export default PostDeleteConfirmDialog;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    py: 1.5,
  },
};
