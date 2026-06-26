import { alpha, Box, Button, IconButton, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

type ExploreHeaderMenuProps = {
  onHandleToggleDrawer: () => void;
};

const ExploreHeaderMenu = ({
  onHandleToggleDrawer,
}: ExploreHeaderMenuProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.containerMenu}>
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack flexDirection="row" alignItems="center">
            <IconButton size="large" onClick={onHandleToggleDrawer}>
              <MenuIcon sx={{ color: "common.white", width: 30, height: 30 }} />
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              disableElevation
              sx={{
                mr: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.7),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              Explorează
            </Button>

            <Button sx={{ color: "common.white" }} disableElevation>
              Urmărești
            </Button>
          </Stack>

          <IconButton
            size="large"
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <SearchIcon
              sx={{ color: "common.white", width: 32.5, height: 32.5 }}
            />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default ExploreHeaderMenu;

const styles = {
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    width: "100%",
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)",
  },
  containerMenu: {
    position: "absolute",
    left: { xs: 2, lg: 16 },
    top: { xs: 2, lg: 16 },
    right: 2,
    zIndex: 11,
    pointerEvents: "auto",
  },
};
