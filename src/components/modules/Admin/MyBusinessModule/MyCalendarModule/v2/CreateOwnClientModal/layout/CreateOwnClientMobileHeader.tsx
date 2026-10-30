import React from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CreateOwnClientMobileHeaderProps = {
  title: string;
  saveLabel: string;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
};

const CreateOwnClientMobileHeader = ({
  title,
  saveLabel,
  isSaving,
  onClose,
  onSave,
}: CreateOwnClientMobileHeaderProps) => {
  return (
    <>
      <AppBar sx={styles.container}>
        <Toolbar sx={styles.toolbar}>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={700} sx={styles.title} noWrap>
            {title}
          </Typography>

          <Box sx={styles.spacer} />
        </Toolbar>
      </AppBar>

      <Box sx={styles.saveBar}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={onSave}
            disabled={isSaving}
            loading={isSaving}
          >
            {saveLabel}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateOwnClientMobileHeader;

const styles = {
  container: {
    position: "relative",
    bgcolor: "background.default",
    color: "text.primary",
    boxShadow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  spacer: {
    width: 40,
    flexShrink: 0,
  },
  saveBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "background.default",
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
};
