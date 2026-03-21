import { Box, Tab, Tabs, Typography } from "@mui/material";
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
};

const ProfileTabs = ({
  isBusinessOrEmployee = false,
  isMyProfile = false,
  userId,
}: ProfileTabsProps) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  const tabs = useMemo<ProfileTabType[]>(
    () => getTabs(isBusinessOrEmployee, isMyProfile),
    [isBusinessOrEmployee, isMyProfile]
  );

  const [currentTab, setCurrentTab] = React.useState<ProfileTabEnum>(
    tabs[0]?.route ?? ProfileTabEnum.POSTS
  );

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
        return <ProfilePostsTab isAuthenticated={isAuthenticated} />;
      case ProfileTabEnum.PRODUCTS:
        return <ProfileProductsTab />;
      case ProfileTabEnum.EMPLOYEES:
        return <ProfileEmployeesTab />;
      case ProfileTabEnum.BOOKMARKS:
        return <ProfileBookmarksTab isAuthenticated={isAuthenticated} />;
      case ProfileTabEnum.INFO:
        return <ProfileInfoTab userId={userId} />;
      default:
        return null;
    }
  }, [currentTab, isAuthenticated]);

  const styles = {
    container: {
      width: "100%",
      bgcolor: "transparent",
      mt: 5,
      borderBottom: 1,
      borderColor: "divider",
    },
    tabs: {
      "& .MuiTabs-indicator": {
        height: 3,
        borderRadius: 2,
      },
      "& .MuiTab-root": {
        textTransform: "none",
        minHeight: 56,
      },
    },
    label: { fontSize: 20, fontWeight: 600 },
  };

  return (
    <>
      <Box sx={styles.container}>
        <Tabs value={currentTab} onChange={handleChange} sx={styles.tabs}>
          {tabs.map((tab) => (
            <Tab
              key={tab.route}
              value={tab.route}
              icon={tab.icon}
              iconPosition="start"
              label={<Typography sx={styles.label}>{tab.label}</Typography>}
              sx={{ minWidth: 200 }}
            />
          ))}
        </Tabs>
      </Box>

      {tabsContent}
    </>
  );
};

export default ProfileTabs;
