import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type PostMoreSheetProps = {
  open: boolean;
  onClose: () => void;
  isLoadingPosts: boolean;
};

const PostMoreSheet = ({
  open,
  onClose,
  isLoadingPosts,
}: PostMoreSheetProps) => {
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

      <Box sx={styles.listContainer}></Box>
    </Drawer>
  );
};

export default PostMoreSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "background.paper",
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
    flexGrow: 1,
    overflowY: "auto",
    px: 0.5,
    WebkitOverflowScrolling: "touch",
  },
};
