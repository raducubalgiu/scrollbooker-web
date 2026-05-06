import { Close } from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";

type AddProductHeaderProps = {
  onHandleClose: () => void;
  onReset: () => void;
  onSaveProduct: () => void;
};

const AddProductHeader = ({
  onHandleClose,
  onReset,
  onSaveProduct,
}: AddProductHeaderProps) => {
  return (
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
          Adaugă Serviciu Nou
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
          onClick={onReset}
        >
          Reset
        </Button>
        <Button variant="contained" disableElevation onClick={onSaveProduct}>
          Salvează Serviciul
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AddProductHeader;

const styles = {
  container: {
    position: "relative",
    bgcolor: "background.paper",
    color: "text.primary",
    boxShadow: 1,
  },
};
