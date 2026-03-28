import { Box, Tab, Tabs, Typography, Theme } from "@mui/material";
import React, { useMemo, ReactElement, useEffect, useCallback } from "react";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ProfilePostsTab from "./ProfilePostsTab";
import ProfileProductsTab from "./ProfileProductsTab";
import ProfileEmployeesTab from "./ProfileEmployeesTab";
import ProfileBookmarksTab from "./ProfileBookmarksTab";
import ProfileInfoTab from "./ProfileInfoTab";
import { useSession } from "next-auth/react";

enum ProfileTabEnum {
  POSTS,
  PRODUCTS,
  EMPLOYEES,
  BOOKMARKS,
  INFO,
}

type ProfileTabType = {
  route: ProfileTabEnum;
  label: string;
  icon: ReactElement;
};

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
    label: "Produse",
    icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  const Employees: ProfileTabType = {
    route: ProfileTabEnum.EMPLOYEES,
    label: "Angajati",
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
    icon: <LocationOnOutlinedIcon sx={{ fontSize: 30 }} />,
  };

  return [
    Posts,
    ...(isBusinessOrEmployee ? [Products, Employees] : []),
    ...(isMyProfile ? [Bookmarks] : []),
    ...(isBusinessOrEmployee ? [Info] : []),
  ];
};

type ProfileTabsProps = {
  isBusinessOrEmployee?: boolean;
  isMyProfile?: boolean;
  userId: number;
  username: string;
  businessOwnerId: number | undefined;
  tab?: string | null | undefined;
};

const ProfileTabs = ({
  isBusinessOrEmployee = false,
  isMyProfile = false,
  userId,
  username,
  businessOwnerId,
  tab,
}: ProfileTabsProps) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const tabs = useMemo<ProfileTabType[]>(
    () => getTabs(isBusinessOrEmployee, isMyProfile),
    [isBusinessOrEmployee, isMyProfile]
  );

  const searchParamTab = useMemo<ProfileTabEnum | null>(() => {
    if (!tab) return null;
    if (tab === "posts") return ProfileTabEnum.POSTS;
    if (tab === "products") return ProfileTabEnum.PRODUCTS;
    if (tab === "employees") return ProfileTabEnum.EMPLOYEES;
    if (tab === "bookmarks") return ProfileTabEnum.BOOKMARKS;
    if (tab === "info") return ProfileTabEnum.INFO;
    return null;
  }, [tab]);

  const [currentTab, setCurrentTab] = React.useState<ProfileTabEnum>(
    searchParamTab ?? ProfileTabEnum.POSTS
  );

  const safeCurrentTab = useMemo(() => {
    const exists = tabs.some((t) => t.route === currentTab);
    return exists ? currentTab : (tabs[0]?.route ?? ProfileTabEnum.POSTS);
  }, [currentTab, tabs]);

  useEffect(() => {
    if (!tabs.find((t) => t.route === currentTab)) {
      setCurrentTab(tabs[0]?.route ?? ProfileTabEnum.POSTS);
    }
  }, [tabs, currentTab]);

  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: ProfileTabEnum) => {
      setCurrentTab(newValue);
    },
    []
  );

  const tabsContent = useMemo(() => {
    switch (currentTab) {
      case ProfileTabEnum.POSTS:
        return <ProfilePostsTab userId={userId} username={username} />;
      case ProfileTabEnum.PRODUCTS:
        return <ProfileProductsTab />;
      case ProfileTabEnum.EMPLOYEES:
        return <ProfileEmployeesTab businessOwnerId={businessOwnerId} />;
      case ProfileTabEnum.BOOKMARKS:
        return <ProfileBookmarksTab username={username} />;
      case ProfileTabEnum.INFO:
        return <ProfileInfoTab userId={userId} />;
      default:
        return null;
    }
  }, [currentTab, isAuthenticated, businessOwnerId, userId]);

  const styles = useMemo(
    () => ({
      container: {
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1200,
        bgcolor: "background.paper",
        mt: 5,
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
          minHeight: 56,
          minWidth: {
            lg: 150,
            xl: 200,
          },
          flex: {
            xs: "1 1 auto",
            lg: "0 1 auto",
          },
        },
        "& .MuiTab-icon": {
          fontSize: {
            xs: 20,
            md: 25,
            lg: 30,
            xl: 35,
          },
        },
      },
      label: {
        fontSize: 20,
        fontWeight: 600,
        display: {
          xs: "none",
          sm: "none",
          md: "none",
          lg: "block",
        },
      },
    }),
    []
  );

  return (
    <>
      <Box sx={styles.container}>
        <Tabs value={safeCurrentTab} onChange={handleChange} sx={styles.tabs}>
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

      {tabsContent}
    </>
  );
};

export default ProfileTabs;
