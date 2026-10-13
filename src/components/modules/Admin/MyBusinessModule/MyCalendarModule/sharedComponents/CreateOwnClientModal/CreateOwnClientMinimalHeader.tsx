import React from "react";
import { AppBar, IconButton, Toolbar, Typography, alpha } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CreateOwnClientMinimalHeaderProps = {
  title: string;
  onClose: () => void;
};

const CreateOwnClientMinimalHeader = ({
  title,
  onClose,
}: CreateOwnClientMinimalHeaderProps) => {
  return (
    <AppBar
      sx={{
        position: "relative",
        bgcolor: "background.default",
        color: "text.primary",
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onClose}
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
          <CloseIcon fontSize="medium" />
        </IconButton>

        <Typography sx={{ ml: 2 }} variant="h6" fontWeight="700">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CreateOwnClientMinimalHeader;
