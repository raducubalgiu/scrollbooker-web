"use client";

import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useMemo, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Theme } from "@mui/material/styles";
import {
  ProfileTabEnum,
  tabEnumToParamMap,
} from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";

import ProfilePostsTab from "./ProfilePostsTab";
import ProfileProductsTab from "./ProfileProductsTab";
import ProfileEmployeesTab from "./ProfileEmployeesTab";
import ProfileBookmarksTab from "./ProfileBookmarksTab";
import ProfileInfoTab from "./info/ProfileInfoTab";
import { StaticImageData } from "next/image";

import VideoIcon from "@/assets/icons/ic_video_outline.svg";
import BagIcon from "@/assets/icons/ic_shopping_outline.svg";
import UsersIcon from "@/assets/icons/ic_users_outline.svg";
import BookmarkIcon from "@/assets/icons/ic_bookmark_outline.svg";
import LocationIcon from "@/assets/icons/ic_location_outline.svg";

type ProfileTabType = {
  route: ProfileTabEnum;
  label: string;
  icon: StaticImageData;
};

type ProfileTabsProps = {
  isBusinessOrEmployee?: boolean;
  isMyProfile?: boolean;
  userId: number;
  businessId: number | null;
  username: string;
  businessOwnerId: number | undefined;
  tab?: string | null | undefined;
  profileHeaderContent?: React.ReactNode;
};

const paramToTabEnumMap = Object.entries(tabEnumToParamMap).reduce(
  (acc, [enumValue, stringValue]) => {
    acc[stringValue] = Number(enumValue) as ProfileTabEnum;
    return acc;
  },
  {} as Record<string, ProfileTabEnum>
);

const getTabs = (
  isBusinessOrEmployee: boolean,
  isMyProfile: boolean
): ProfileTabType[] => {
  return [
    {
      route: ProfileTabEnum.POSTS,
      label: "Postări",
      icon: VideoIcon,
    },
    ...(isBusinessOrEmployee
      ? [
          {
            route: ProfileTabEnum.PRODUCTS,
            label: "Prețuri",
            icon: BagIcon,
          },
        ]
      : []),
    ...(isBusinessOrEmployee
      ? [
          {
            route: ProfileTabEnum.EMPLOYEES,
            label: "Specialiști",
            icon: UsersIcon,
          },
        ]
      : []),
    ...(isMyProfile
      ? [
          {
            route: ProfileTabEnum.BOOKMARKS,
            label: "Salvat",
            icon: BookmarkIcon,
          },
        ]
      : []),
    ...(isBusinessOrEmployee
      ? [
          {
            route: ProfileTabEnum.INFO,
            label: "Info",
            icon: LocationIcon,
          },
        ]
      : []),
  ];
};

const ProfileTabs = ({
  isBusinessOrEmployee = false,
  isMyProfile = false,
  userId,
  businessId,
  username,
  businessOwnerId,
  tab,
  profileHeaderContent,
}: ProfileTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = useMemo<ProfileTabType[]>(
    () => getTabs(isBusinessOrEmployee, isMyProfile),
    [isBusinessOrEmployee, isMyProfile]
  );

  const safeValue = useMemo(() => {
    const urlTabEnum = tab ? paramToTabEnumMap[tab] : undefined;
    const activeTab = urlTabEnum ?? ProfileTabEnum.POSTS;

    return tabs.some((t) => t.route === activeTab)
      ? activeTab
      : (tabs[0]?.route ?? ProfileTabEnum.POSTS);
  }, [tab, tabs]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: ProfileTabEnum) => {
      const paramValue = tabEnumToParamMap[newValue];
      if (paramValue) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", paramValue);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [router, pathname, searchParams]
  );

  const renderTabContent = () => {
    switch (safeValue) {
      case ProfileTabEnum.POSTS:
        return <ProfilePostsTab userId={userId} />;
      case ProfileTabEnum.PRODUCTS:
        return <ProfileProductsTab businessId={businessId} userId={userId} />;
      case ProfileTabEnum.EMPLOYEES:
        return <ProfileEmployeesTab businessOwnerId={businessOwnerId} />;
      case ProfileTabEnum.BOOKMARKS:
        return <ProfileBookmarksTab username={username} />;
      case ProfileTabEnum.INFO:
        return <ProfileInfoTab userId={userId} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={styles.scrollWrapper}>
      {profileHeaderContent}

      <Box sx={styles.container}>
        <Tabs
          value={safeValue}
          onChange={handleChange}
          sx={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((t) => (
            <Tab
              key={t.route}
              value={t.route}
              icon={
                <Box
                  sx={{
                    width: { xs: 20, lg: 25 },
                    height: { xs: 20, lg: 25 },
                    backgroundColor: "currentColor",
                    maskImage: `url(${t.icon.src})`,
                    WebkitMaskImage: `url(${t.icon.src})`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    mr: 1,
                  }}
                />
              }
              iconPosition="start"
              label={<Typography sx={styles.label}>{t.label}</Typography>}
            />
          ))}
        </Tabs>
      </Box>

      {renderTabContent()}
    </Box>
  );
};

export default ProfileTabs;

const styles = {
  scrollWrapper: {
    flexGrow: 1,
    width: "100%",
    overflowY: { xs: "auto", lg: "visible" },
    WebkitOverflowScrolling: "touch",
    overscrollBehaviorY: "contain",
  },
  container: {
    width: "100%",
    position: "sticky",
    top: 0,
    zIndex: 10,
    mt: { md: 0, lg: 5 },
    bgcolor: "background.default",
    borderBottom: 1,
    borderColor: "divider",
    boxShadow: (theme: Theme) => `0 1px 0 ${theme.palette.divider}`,
  },
  tabs: {
    "& .MuiTabs-indicator": { height: 3, borderRadius: 2, width: "100%" },
    "& .MuiTab-root": {
      textTransform: "none",
      minHeight: 40,
      minWidth: { xs: 75, md: 150, lg: 150, xl: 200 },
      px: { xs: 1, sm: 2 },
    },
    "& .MuiTab-icon": { fontSize: { xs: 22.5, md: 25, lg: 30 } },
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    display: { xs: "none", lg: "block" },
  },
};
