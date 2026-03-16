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
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import StoreIcon from "@mui/icons-material/Store";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo/UserInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { signOut, useSession } from "next-auth/react";
import Protected from "@/components/cutomized/Protected/Protected";
import { useCustomQuery } from "@/hooks/useHttp";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import { authOptions } from "@/lib/auth/authOptions";

type SidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const router = useRouter();
  const session = useSession();
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
    {
      label: "Dashboard",
      route: "/my-business/dashboard",
      icon: <DashboardOutlinedIcon />,
      permission: PermissionEnum.NO_PROTECTION,
    },
    {
      label: "Programări",
      route: "/appointments",
      icon: <EventAvailableIcon />,
      permission: PermissionEnum.NO_PROTECTION,
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
      label: "Detalii Business",
      route: "/my-business/business-details",
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
      icon: <AssignmentTurnedInOutlinedIcon />,
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
    <Box sx={{ height: "100%", width: collapsed ? 80 : "auto" }}>
      <UserInfo
        user={user}
        isLoadingUser={isLoadingUser}
        refetchUser={refetchUser}
        collapsed={collapsed}
      />
      <Divider sx={{ mb: 0.5 }} />
      <List
        sx={{
          pb: 5,
          rowGap: 0.5,
          "& .MuiListItemButton-root": {
            py: 1.5,
          },
          "& .MuiListItemIcon-root": {
            minWidth: collapsed ? 0 : 40,
            justifyContent: "center",
          },
          "& .MuiListItemText-root": {
            ml: collapsed ? 0 : 1,
          },
        }}
      >
        {dashboardRoutes?.map((userRoute, i) => (
          <Protected key={i} permission={userRoute.permission} showSkeleton>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={() => router.push(userRoute.route)}
                selected={isLinkSelected(userRoute.route)}
                sx={{
                  px: collapsed ? 0 : 2.5,
                  justifyContent: collapsed ? "center" : undefined,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : undefined,
                    justifyContent: "center",
                  }}
                >
                  {userRoute.icon}
                </ListItemIcon>
                <ListItemText sx={{ display: collapsed ? "none" : "block" }}>
                  {userRoute.label}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Protected>
        ))}
        <Protected permission="MY_BUSINESS_ROUTES_VIEW">
          <Divider sx={{ my: 1.5 }} />
          <ListItemButton
            onClick={handleOpenMyBusiness}
            sx={{
              mb: 1.5,
              px: collapsed ? 0 : 2.5,
              justifyContent: collapsed ? "center" : undefined,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : undefined,
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <StoreIcon />
                {collapsed &&
                  (openMyBusiness ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  ))}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Afacerea mea"
              slotProps={{
                primary: { sx: { fontWeight: "bold" } },
              }}
              sx={{ display: collapsed ? "none" : "block" }}
            />
            {!collapsed && (openMyBusiness ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openMyBusiness} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {myBusinessRoutes.map((businessRoute, i) => {
                // Skip "Angajați" route when the business doesn't have employees according to session
                if (
                  businessRoute.route === "/my-business/employees" &&
                  !session?.data?.has_employees
                ) {
                  return null;
                }

                return (
                  <Protected key={i} permission={businessRoute.permission}>
                    <ListItemButton
                      sx={{
                        mb: 0.5,
                        justifyContent: "center",
                      }}
                      onClick={() => router.push(businessRoute.route)}
                      selected={isLinkSelected(businessRoute.route)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: collapsed ? 0 : undefined,
                          justifyContent: "center",
                        }}
                      >
                        {businessRoute.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={businessRoute.label}
                        sx={{ display: collapsed ? "none" : "block" }}
                      />
                    </ListItemButton>
                  </Protected>
                );
              })}
            </List>
          </Collapse>
          <Divider sx={{ my: 1.5 }} />
        </Protected>
        {settingsRoutes?.map((userRoute, i) => (
          <Protected key={i} permission={userRoute.permission} showSkeleton>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={() => router.push(userRoute.route)}
                selected={isLinkSelected(userRoute.route)}
                sx={{
                  mb: 0.5,
                  px: collapsed ? 0 : 2.5,
                  justifyContent: collapsed ? "center" : undefined,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : undefined,
                    justifyContent: "center",
                  }}
                >
                  {userRoute.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    display: collapsed ? "none" : "block",
                  }}
                >
                  {userRoute.label}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Protected>
        ))}
        <Protected permission="NOMENCLATURES_VIEW">
          <Divider sx={{ mb: 1.5 }} />
          <ListItemButton
            onClick={handleOpenNomenclatures}
            sx={{
              mb: 1.5,
              justifyContent: collapsed ? "center" : undefined,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : undefined,
                justifyContent: "center",
                color: "text.primary",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <AdminPanelPlaylistAddCheckOutlinedIcon />
                {collapsed &&
                  (openNomenclatures ? (
                    <ExpandLess fontSize="small" />
                  ) : (
                    <ExpandMore fontSize="small" />
                  ))}
              </Box>
            </ListItemIcon>
            <ListItemText
              primary="Super Admin"
              slotProps={{
                primary: { sx: { fontWeight: "bold" } },
              }}
              sx={{ display: collapsed ? "none" : "block" }}
            />
            {!collapsed &&
              (openNomenclatures ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openNomenclatures} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {nomenclaturesRoutes.map((superAdmin, i) => (
                <ListItemButton
                  key={i}
                  sx={{
                    mb: 0.5,
                    justifyContent: "center",
                  }}
                  onClick={() => router.push(superAdmin.route)}
                  selected={isLinkSelected(superAdmin.route)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : undefined,
                      justifyContent: "center",
                    }}
                  >
                    <PlaylistAddCheckOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={superAdmin.label}
                    sx={{ display: collapsed ? "none" : "block" }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Protected>
        <Divider sx={{ my: 1.5 }} />
        <ListItemButton
          onClick={() => signOut()}
          sx={{
            mb: 1.5,
            px: collapsed ? 0 : 2.5,
            justifyContent: collapsed ? "center" : undefined,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: collapsed ? 0 : undefined,
              justifyContent: "center",
            }}
          >
            <LogoutIcon color="error" />
          </ListItemIcon>
          <ListItemText
            primary="Log Out"
            slotProps={{
              primary: { sx: { color: "error.main", fontWeight: 600 } },
            }}
            sx={{ display: collapsed ? "none" : "block" }}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
