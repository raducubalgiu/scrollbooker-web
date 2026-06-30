import { alpha, Box, Button, IconButton, Stack, Theme } from "@mui/material";
import React from "react";

import SearchIcon from "@/assets/icons/ic_search.svg";
import BurgerIcon from "@/assets/icons/ic_menu_solid.svg";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";

export enum ExploreTabEnum {
  EXPLORE,
  FOLLOWING,
}

type ExploreHeaderMenuProps = {
  activeTab: ExploreTabEnum;
  onHandleToggleDrawer: () => void;
  onTabChange: (tab: ExploreTabEnum) => void;
};

const TABS: { key: ExploreTabEnum; label: string }[] = [
  { key: ExploreTabEnum.EXPLORE, label: "Explorează" },
  { key: ExploreTabEnum.FOLLOWING, label: "Urmărești" },
];

const ExploreHeaderMenu = ({
  activeTab,
  onHandleToggleDrawer,
  onTabChange,
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
              <CustomSvg
                src={BurgerIcon}
                size={30}
                sx={{ backgroundColor: "common.white" }}
              />
            </IconButton>

            {TABS.map(({ key, label }) => {
              const isActive = activeTab === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "contained" : "text"}
                  disableElevation
                  onClick={() => onTabChange(key)}
                  sx={{
                    mr: 1,
                    color: "common.white",
                    ...(isActive && {
                      bgcolor: (theme: Theme) =>
                        alpha(theme.palette.primary.main, 0.7),
                    }),
                  }}
                >
                  {label}
                </Button>
              );
            })}
          </Stack>

          <IconButton
            onClick={() => navigateTo(AppRoutes.searchUsers())}
            size="large"
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <CustomSvg
              src={SearchIcon}
              size={30}
              sx={{ backgroundColor: "common.white" }}
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
