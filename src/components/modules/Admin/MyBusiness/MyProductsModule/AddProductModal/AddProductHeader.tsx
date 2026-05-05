import { Close } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
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
        <IconButton edge="start" color="inherit" onClick={onHandleClose}>
          <Close />
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
