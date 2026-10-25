import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { buildPostMoreOptionsItems } from "../postMoreOptionsItems";

type PostMoreSheetProps = {
  open: boolean;
  onClose: () => void;
  onStatisticsClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
  isLoadingDelete: boolean;
};

const PostMoreSheet = ({
  open,
  onClose,
  onStatisticsClick,
  onEditClick,
  onDeleteClick,
  isLoadingDelete,
}: PostMoreSheetProps) => {
  const items = buildPostMoreOptionsItems({
    onStatisticsClick,
    onEditClick,
    onDeleteClick,
    isLoadingDelete,
  });

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
            Postarea mea
          </Typography>

          <IconButton onClick={onClose} size="small" sx={styles.iconBack}>
            <CloseIcon fontSize="medium" sx={{ color: "text.primary" }} />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={styles.listContainer}>
        <List disablePadding>
          {items.map((item) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.onClick();
                  onClose();
                }}
                sx={styles.item}
              >
                <ListItemIcon
                  sx={{
                    ...styles.itemIcon,
                    color: item.isDestructive ? "error.main" : undefined,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  slotProps={{
                    primary: {
                      fontWeight: 500,
                      color: item.isDestructive ? "error.main" : undefined,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default PostMoreSheet;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
<<<<<<< HEAD
    height: "75vh",
=======
>>>>>>> bc85405 (Implement MoreMenu)
    display: "flex",
    flexDirection: "column" as const,
  },
  container: {
    width: "100%",
    py: 1,
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
    overflowY: "auto" as const,
    py: 1,
    WebkitOverflowScrolling: "touch" as const,
  },
  item: {
    borderRadius: 2,
    mx: 1,
    px: 2,
    py: 1.5,
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
  itemIcon: {
    minWidth: 40,
  },
};
