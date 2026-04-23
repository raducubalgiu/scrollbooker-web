"use client";

import React from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { usePathname, useRouter } from "next/navigation";

const actions = [
  { label: "Home", route: "/", icon: <HomeIcon /> },
  { label: "Explore", route: "/explore", icon: <ExploreOutlinedIcon /> },
  {
    label: "Notificări",
    route: "/notifications",
    icon: <NotificationsNoneOutlinedIcon />,
  },
  {
    label: "Rezervări",
    route: "/appointments",
    icon: <QueryBuilderOutlinedIcon />,
  },
  { label: "Profil", route: "/profile", icon: <PersonOutlineOutlinedIcon /> },
];

export default function BottomBar() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  const currentIndex = React.useMemo(() => {
    const idx = actions.findIndex(
      (a) => pathname === a.route || pathname.startsWith(a.route + "/")
    );
    return idx >= 0 ? idx : 0;
  }, [pathname]);

  const [value, setValue] = React.useState<number>(currentIndex);

  React.useEffect(() => {
    setValue(currentIndex);
  }, [currentIndex]);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        display: { md: "block", lg: "none" },
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
          const route = actions[newValue]?.route;
          if (route) router.push(route);
        }}
      >
        {actions.map((a) => (
          <BottomNavigationAction
            key={a.route}
            label={a.label}
            icon={a.icon}
            sx={{ py: 1.25 }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
