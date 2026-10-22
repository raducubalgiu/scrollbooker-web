import { Badge, Box, IconButton, Stack, Theme } from "@mui/material";
import React from "react";
import NextLink from "next/link";

import SearchIcon from "@/assets/icons/ic_search.svg";
import BurgerIcon from "@/assets/icons/ic_menu_solid.svg";
import { AppRoutes } from "@/utils/routes";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";
import FeedTab from "./FeedTab";

export enum FeedTabEnum {
  EXPLORE,
  FOLLOWING,
}

type FeedTabsProps = {
  activeTab: FeedTabEnum;
  activeFiltersCount: number;
  onHandleToggleDrawer: () => void;
  onTabChange: (tab: FeedTabEnum) => void;
};

const TABS: { key: FeedTabEnum; label: string }[] = [
  { key: FeedTabEnum.EXPLORE, label: "Explorează" },
  { key: FeedTabEnum.FOLLOWING, label: "Urmărești" },
];

const FeedTabs = ({
  activeTab,
  activeFiltersCount,
  onHandleToggleDrawer,
  onTabChange,
}: FeedTabsProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.containerMenu}>
        <Box sx={styles.grid}>
          <Box sx={{ justifySelf: "start" }}>
            <IconButton size="large" onClick={onHandleToggleDrawer}>
              <Badge
                badgeContent={activeFiltersCount}
                color="primary"
                invisible={activeFiltersCount === 0}
                sx={styles.filterBadge}
              >
                <CustomSvg
                  src={BurgerIcon}
                  size={30}
                  sx={{
                    backgroundColor: "common.white",
                    width: { xs: 28, lg: 30 },
                    height: { xs: 28, lg: 30 },
                  }}
                />
              </Badge>
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
              component={NextLink}
              href={AppRoutes.searchUsers()}
              size="large"
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <CustomSvg
                src={SearchIcon}
                size={30}
                sx={{
                  backgroundColor: "common.white",
                  width: { xs: 28, lg: 30 },
                  height: { xs: 28, lg: 30 },
                }}
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
  filterBadge: {
    "& .MuiBadge-badge": {
      top: 5,
      right: 5,
      minWidth: 16,
      height: 16,
      padding: 0,
      fontSize: 10,
      fontWeight: 700,
      color: "common.white",
    },
  },
} as const;
