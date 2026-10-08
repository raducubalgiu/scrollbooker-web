import { Close } from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

type AddProductHeaderProps = {
  isSavingProduct: boolean;
  onHandleClose: () => void;
  onReset: () => void;
  onSaveProduct: () => void;
  title?: string;
  desktopSaveLabel?: string;
  mobileSaveLabel?: string;
};

const AddProductHeader = ({
  isSavingProduct,
  onHandleClose,
  onReset,
  onSaveProduct,
  title = "Adaugă serviciu",
  desktopSaveLabel = "Salvează Serviciul",
  mobileSaveLabel = "Creează serviciu",
}: AddProductHeaderProps) => {
  return (
    <>
      <AppBar sx={styles.container}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onHandleClose}
            size="large"
            sx={{
              bgcolor: "action.hover",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.action.active, 0.12),
                transform: "scale(1.05)",
              },
            }}
          >
            <Close fontSize="medium" />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" fontWeight="700">
            {title}
          </Typography>

          <Button
            variant="outlined"
            color="secondary"
            sx={styles.desktopOnly}
            onClick={onReset}
            disabled={isSavingProduct}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={onSaveProduct}
            disabled={isSavingProduct}
            loading={isSavingProduct}
            sx={[styles.desktopOnly, { ml: 2 }]}
          >
            {desktopSaveLabel}
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={styles.mobileSaveBar}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={onSaveProduct}
            disabled={isSavingProduct}
            loading={isSavingProduct}
          >
            {mobileSaveLabel}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AddProductHeader;

const styles = {
  container: {
    position: "relative",
    bgcolor: "background.default",
    color: "text.primary",
    boxShadow: 1,
  },
  desktopOnly: {
    display: { xs: "none", md: "inline-flex" },
  },
  mobileSaveBar: {
    display: { xs: "block", md: "none" },
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: "background.default",
    zIndex: (theme: Theme) => theme.zIndex.modal + 1,
  },
};
