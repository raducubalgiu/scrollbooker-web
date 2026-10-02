import { Box, IconButton, Stack, Theme, Typography } from "@mui/material";
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
        <Box sx={styles.grid}>
          <Box sx={{ justifySelf: "start" }}>
            <IconButton size="large" onClick={onHandleToggleDrawer}>
              <CustomSvg
                src={BurgerIcon}
                size={30}
                sx={{ backgroundColor: "common.white" }}
              />
            </IconButton>
          </Box>

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ justifySelf: "center" }}
          >
            {TABS.map(({ key, label }) => {
              const isActive = activeTab === key;
              return (
                <Box
                  key={key}
                  component="button"
                  type="button"
                  onClick={() => onTabChange(key)}
                  sx={styles.tabButton}
                >
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: isActive ? 700 : 600,
                      color: isActive
                        ? "common.white"
                        : "rgba(255,255,255,0.7)",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                      transition: "color 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {label}
                  </Typography>

                  <Box sx={styles.underlineTrack}>
                    <Box
                      sx={{
                        ...styles.underline,
                        opacity: isActive ? 1 : 0,
                        transform: `scaleX(${isActive ? 1 : 0})`,
                      }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Box sx={{ justifySelf: "end" }}>
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
          </Box>
        </Box>
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
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    width: "100%",
    px: 1,
  },
  tabButton: {
    border: "none",
    background: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 0.75,
  },
  underlineTrack: {
    width: 18,
    height: 2.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  underline: {
    width: 18,
    height: 2.5,
    borderRadius: 50,
    backgroundColor: "common.white",
    boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
    transition: "opacity 0.25s ease, transform 0.25s ease",
  },
} as const;
