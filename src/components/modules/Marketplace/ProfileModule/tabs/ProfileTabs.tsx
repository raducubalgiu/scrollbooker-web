import { Box, Tab, Tabs, Typography, Theme } from "@mui/material";
import React, { useMemo, ReactElement, useCallback } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import ProfilePostsTab from "./ProfilePostsTab";
import ProfileProductsTab from "./ProfileProductsTab";
import ProfileEmployeesTab from "./ProfileEmployeesTab";
import ProfileBookmarksTab from "./ProfileBookmarksTab";
import ProfileInfoTab from "./info/ProfileInfoTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProfileTabEnum, tabEnumToParamMap } from "./profileTabsHelper";

type ProfileTabType = {
  route: ProfileTabEnum;
  label: string;
  icon: ReactElement;
};

type ProfileTabsProps = {
  isBusinessOrEmployee?: boolean;
  isMyProfile?: boolean;
  userId: number;
  businessId: number | null;
  username: string;
  businessOwnerId: number | undefined;
  tab?: string | null | undefined;
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
  const Posts: ProfileTabType = {
    route: ProfileTabEnum.POSTS,
    label: "Postări",
    icon: <VideoLibraryOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  const Products: ProfileTabType = {
    route: ProfileTabEnum.PRODUCTS,
    label: "Prețuri",
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  const Employees: ProfileTabType = {
    route: ProfileTabEnum.EMPLOYEES,
    label: "Specialiști",
    icon: <PeopleOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  const Bookmarks: ProfileTabType = {
    route: ProfileTabEnum.BOOKMARKS,
    label: "Salvat",
    icon: <BookmarkBorderOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  const Info: ProfileTabType = {
    route: ProfileTabEnum.INFO,
    label: "Info",
    icon: <FmdGoodOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  return [
    Posts,
    ...(isBusinessOrEmployee ? [Products, Employees] : []),
    ...(isMyProfile ? [Bookmarks] : []),
    ...(isBusinessOrEmployee ? [Info] : []),
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
        return <ProfilePostsTab userId={userId} username={username} />;
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
    <>
      <Box sx={styles.container}>
        <Tabs
          value={safeValue}
          onChange={handleChange}
          sx={styles.tabs}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.route}
              value={tab.route}
              icon={tab.icon}
              iconPosition="start"
              label={<Typography sx={styles.label}>{tab.label}</Typography>}
            />
          ))}
        </Tabs>
      </Box>

      {renderTabContent()}
    </>
  );
};

export default ProfileTabs;

const styles = {
  container: {
    width: "100%",
    bgcolor: "background.paper",
    position: { xs: "sticky", lg: "relative" },
    top: { xs: 50, lg: "auto" },
    zIndex: 1000,
    mt: { md: 0, lg: 5 },
    borderTop: 1,
    borderBottom: 1,
    borderColor: "divider",
    boxShadow: (theme: Theme) => `0 1px 0 ${theme.palette.divider}`,
  },
  tabs: {
    "& .MuiTabs-indicator": {
      height: 3,
      borderRadius: 2,
      width: "100%",
    },
    "& .MuiTab-root": {
      textTransform: "none",
      minHeight: 40,
      minWidth: {
        xs: 75,
        md: 150,
        lg: 150,
        xl: 200,
      },
      px: { xs: 1, sm: 2 },
    },
    "& .MuiTab-icon": {
      fontSize: {
        xs: 22.5,
        md: 25,
        lg: 30,
      },
    },
  },
  label: {
    fontSize: 20,
    fontWeight: 600,
    display: {
      xs: "none",
      lg: "block",
    },
  },
};
