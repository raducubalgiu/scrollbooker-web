import { alpha, Box, Button, IconButton, Stack, Theme } from "@mui/material";
import React from "react";

import SearchIcon from "@/assets/icons/ic_search.svg";
import BurgerIcon from "@/assets/icons/ic_menu_solid.svg";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";

type ExploreHeaderMenuProps = {
  onHandleToggleDrawer: () => void;
};

const ExploreHeaderMenu = ({
  onHandleToggleDrawer,
}: ExploreHeaderMenuProps) => {
  const { navigateTo } = useAppNavigation();

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
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  backgroundColor: "common.white",
                  maskImage: `url(${BurgerIcon.src})`,
                  WebkitMaskImage: `url(${BurgerIcon.src})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              disableElevation
              size="small"
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

            <Button
              sx={{ color: "common.white" }}
              size="small"
              disableElevation
            >
              Urmărești
            </Button>
          </Stack>

          <IconButton
            onClick={() => navigateTo(AppRoutes.searchUsers())}
            size="large"
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                backgroundColor: "common.white",
                maskImage: `url(${SearchIcon.src})`,
                WebkitMaskImage: `url(${SearchIcon.src})`,
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
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
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.1) 60%, transparent 100%)",
    height: 75,
    zIndex: 10,
    pointerEvents: "none",
  },
  containerMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    top: (theme: Theme) => theme.spacing(1),
    zIndex: 11,
    pointerEvents: "auto",
  },
} as const;
