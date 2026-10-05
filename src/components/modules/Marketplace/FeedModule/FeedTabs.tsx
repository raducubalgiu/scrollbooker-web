import { Box, IconButton, Stack, Theme } from "@mui/material";
import React from "react";

import SearchIcon from "@/assets/icons/ic_search.svg";
import BurgerIcon from "@/assets/icons/ic_menu_solid.svg";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";
import FeedTab from "./FeedTab";

export enum FeedTabEnum {
  EXPLORE,
  FOLLOWING,
}

type FeedTabsProps = {
  activeTab: FeedTabEnum;
  onHandleToggleDrawer: () => void;
  onTabChange: (tab: FeedTabEnum) => void;
};

const TABS: { key: FeedTabEnum; label: string }[] = [
  { key: FeedTabEnum.EXPLORE, label: "Explorează" },
  { key: FeedTabEnum.FOLLOWING, label: "Urmărești" },
];

const FeedTabs = ({
  activeTab,
  onHandleToggleDrawer,
  onTabChange,
}: FeedTabsProps) => {
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
                <FeedTab
                  key={key}
                  label={label}
                  isActive={isActive}
                  onClick={() => onTabChange(key)}
                />
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

export default FeedTabs;

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
} as const;
