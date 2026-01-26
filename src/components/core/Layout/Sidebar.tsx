"use client";

import React, { useState, useCallback } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AdminPanelPlaylistAddCheckOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo/UserInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { signOut } from "next-auth/react";
import Protected from "@/components/cutomized/Protected/Protected";
import { useCustomQuery } from "@/hooks/useHttp";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { UserProfileType } from "@/ts/models/User/UserProfileType";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openNomenclatures, setOpenNomenclatures] = useState(false);
  const [openMyBusiness, setOpenMyBusiness] = useState(true);

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch: refetchUser,
  } = useCustomQuery<UserProfileType>({
    key: ["user-profile"],
    url: "/api/profile",
  });

  const handleOpenNomenclatures = () => setOpenNomenclatures((open) => !open);
  const handleOpenMyBusiness = () => setOpenMyBusiness((open) => !open);

  const isLinkSelected = useCallback(
    (href: string) => {
      if (pathname && href !== "/") return pathname.startsWith(href);

      return pathname === href;
    },
    [pathname]
  );

  const dashboardRoutes = [
    {
      label: "Calendar",
      route: "/",
      icon: <CalendarMonthIcon />,
      permission: PermissionEnum.MY_CALENDAR_VIEW,
    },
  ];

  const settingsRoutes = [
    {
      label: "Notificări",
      route: "/notifications",
      icon: <NotificationsNoneOutlinedIcon />,
      permission: PermissionEnum.NO_PROTECTION,
    },
    {
      label: "Setări",
      route: "/settings",
      icon: <ManageAccountsOutlinedIcon />,
      permission: PermissionEnum.NO_PROTECTION,
    },
  ];

  const myBusinessRoutes = [
    {
      label: "Dashboard",
      route: "/my-business/dashboard",
      icon: <DashboardOutlinedIcon />,
      permission: PermissionEnum.NO_PROTECTION,
    },
    {
      label: "Locație",
      route: "/my-business/location",
      icon: <PlaceOutlinedIcon />,
      permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
    },
    {
      label: "Programul de lucru",
      route: "/my-business/schedules",
      icon: <ScheduleIcon />,
      permission: PermissionEnum.MY_SCHEDULES_VIEW,
    },
    {
      label: "Servicii",
      route: "/my-business/services",
      icon: <ScheduleIcon />,
      permission: PermissionEnum.MY_SERVICES_VIEW,
    },
    {
      label: "Produse",
      route: "/my-business/products",
      icon: <ShoppingBagOutlinedIcon />,
      permission: PermissionEnum.MY_PRODUCTS_VIEW,
    },
    {
      label: "Angajați",
      route: "/my-business/employees",
      icon: <PeopleAltOutlinedIcon />,
      permission: PermissionEnum.MY_EMPLOYEES_VIEW,
    },
    {
      label: "Cereri de angajare",
      route: "/my-business/employment-requests",
      icon: <ScheduleSendOutlinedIcon />,
      permission: PermissionEnum.MY_EMPLOYMENT_REQUESTS_VIEW,
    },
  ];

  const nomenclaturesRoutes = [
    {
      label: "Validează afacerea",
      route: "/businesses/approve",
    },
    {
      label: "Roluri și permisiuni",
      route: "/nomenclatures/roles-and-permissions",
    },
    {
      label: "Domeniu Business",
      route: "/nomenclatures/business-domains",
    },
    {
      label: "Tip Business",
      route: "/nomenclatures/business-types",
    },
    {
      label: "Domeniu Serviciu",
      route: "/nomenclatures/service-domains",
    },
    {
      label: "Servicii",
      route: "/nomenclatures/services",
    },
    {
      label: "Filtre",
      route: "/nomenclatures/filters",
    },
    {
      label: "Profesii",
      route: "/nomenclatures/professions",
    },
    {
      label: "Monede",
      route: "/nomenclatures/currencies",
    },
  ];

  return (
    <Box sx={{ height: "100%" }}>
      <UserInfo
        user={user}
        isLoadingUser={isLoadingUser}
        refetchUser={refetchUser}
      />
      <Divider sx={{ mb: 0.5 }} />
      <List sx={{ pb: 5 }}>
        {dashboardRoutes?.map((userRoute, i) => (
          <Protected key={i} permission={userRoute.permission} showSkeleton>
            <ListItem disablePadding sx={{ px: 2.5 }}>
              <ListItemButton
                onClick={() => router.push(userRoute.route)}
                selected={isLinkSelected(userRoute.route)}
              >
                <ListItemIcon>{userRoute.icon}</ListItemIcon>
                <ListItemText>{userRoute.label}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Protected>
        ))}
        <Protected permission="MY_BUSINESS_ROUTES_VIEW">
          <Divider sx={{ my: 1.5 }} />
          <ListItemButton onClick={handleOpenMyBusiness} sx={{ mb: 1.5 }}>
            <ListItemIcon>
              <ShoppingBagOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Afacerea mea"
              slotProps={{
                primary: { sx: { fontWeight: "bold" } },
              }}
            />
            {openMyBusiness ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openMyBusiness}
            timeout="auto"
            unmountOnExit
            sx={{ px: 2.5 }}
          >
            <List component="div" disablePadding>
              {myBusinessRoutes.map((businessRoute, i) => (
                <Protected key={i} permission={businessRoute.permission}>
                  <ListItemButton
                    sx={{ pl: 4, mb: 0.5 }}
                    onClick={() => router.push(businessRoute.route)}
                    selected={isLinkSelected(businessRoute.route)}
                  >
                    <ListItemIcon>{businessRoute.icon}</ListItemIcon>
                    <ListItemText primary={businessRoute.label} />
                  </ListItemButton>
                </Protected>
              ))}
            </List>
          </Collapse>
          <Divider sx={{ my: 1.5 }} />
        </Protected>
        {settingsRoutes?.map((userRoute, i) => (
          <Protected key={i} permission={userRoute.permission} showSkeleton>
            <ListItem disablePadding sx={{ px: 2.5 }}>
              <ListItemButton
                onClick={() => router.push(userRoute.route)}
                selected={isLinkSelected(userRoute.route)}
                sx={{ mb: 0.5 }}
              >
                <ListItemIcon>{userRoute.icon}</ListItemIcon>
                <ListItemText>{userRoute.label}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Protected>
        ))}
        <Protected permission="NOMENCLATURES_VIEW">
          <Divider sx={{ mb: 1.5 }} />
          <ListItemButton
            onClick={handleOpenNomenclatures}
            sx={{ mb: 1.5, px: 2.5 }}
          >
            <ListItemIcon>
              <AdminPanelPlaylistAddCheckOutlinedIcon />
            </ListItemIcon>
            <ListItemText
              primary="Super Admin"
              slotProps={{
                primary: { sx: { fontWeight: "bold" } },
              }}
            />
            {openNomenclatures ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            in={openNomenclatures}
            timeout="auto"
            unmountOnExit
            sx={{ px: 2.5 }}
          >
            <List component="div" disablePadding>
              {nomenclaturesRoutes.map((superAdmin, i) => (
                <ListItemButton
                  key={i}
                  sx={{ pl: 4, mb: 0.5 }}
                  onClick={() => router.push(superAdmin.route)}
                  selected={isLinkSelected(superAdmin.route)}
                >
                  <ListItemIcon>
                    <PlaylistAddCheckOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary={superAdmin.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Protected>
        <Divider sx={{ my: 1.5 }} />
        <ListItemButton onClick={() => signOut()} sx={{ mb: 1.5, px: 2.5 }}>
          <ListItemIcon>
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Log Out"
            slotProps={{ primary: { sx: { color: "error.main" } } }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
