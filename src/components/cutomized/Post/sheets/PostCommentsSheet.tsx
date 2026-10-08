import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PostComments from "@/components/modules/Marketplace/CommentsModule/PostComments";

type PostCommentsSheetProps = {
  open: boolean;
  onClose: () => void;
  postId: number | undefined;
  postAuthorAvatar?: string | null;
};

const PostCommentsSheet = ({
  open,
  onClose,
  postId,
  postAuthorAvatar = null,
}: PostCommentsSheetProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", lg: "none" } }}
      slotProps={{
        paper: { sx: styles.drawer },
      }}
    >
      <Box sx={styles.container}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={2}
          minHeight={30}
        >
          <Typography fontWeight={800} fontSize={16}>
            Comentarii
          </Typography>

          <IconButton onClick={onClose} size="small" sx={styles.iconBack}>
            <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={styles.listContainer}>
        <PostComments postId={postId} postAuthorAvatar={postAuthorAvatar} />
      </Box>
    </Drawer>
  );
};

export default PostCommentsSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "75vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    width: "100%",
    pt: 2,
    pb: 1.5,
    borderBottom: 1,
    borderColor: "divider",
    flexShrink: 0,
  },
  iconBack: {
    position: "absolute",
    right: 0,
    color: "text.secondary",
  },
  listContainer: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    px: 0.5,
  },
};
