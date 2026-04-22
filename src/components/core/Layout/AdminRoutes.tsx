"use client";

import React, { memo } from "react";
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { ScrollBookerRoute } from "./MarketplaceDrawer";

type AdminRoutesProps = {
  hasEmployees: boolean;
  isSelected: (route: string) => boolean;
  isCollapsed: boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const AdminRoutes = ({
  hasEmployees,
  isSelected,
  isCollapsed,
  onNavigate,
}: AdminRoutesProps) => {
  const [openMyBusiness, setOpenMyBusiness] = React.useState(true);
  const [openNomenclatures, setOpenNomenclatures] = React.useState(false);

  // 1. Definirea rutelor în useMemo pentru a evita recrearea obiectelor la fiecare randare
  const adminRoutes: ScrollBookerRoute[] = React.useMemo(
    () => [
      {
        label: "Calendar",
        route: "/admin/calendar",
        icon: <CalendarMonthIcon />,
        permission: PermissionEnum.MY_CALENDAR_VIEW,
      },
      {
        label: "Dashboard",
        route: "/admin/my-business/dashboard",
        icon: <DashboardOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Detalii Business",
        route: "/admin/my-business/business-details",
        icon: <PlaceOutlinedIcon />,
        permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
      },
      {
        label: "Programul de lucru",
        route: "/admin/my-business/schedules",
        icon: <ScheduleIcon />,
        permission: PermissionEnum.MY_SCHEDULES_VIEW,
      },
      {
        label: "Servicii",
        route: "/admin/my-business/services",
        icon: <AssignmentTurnedInOutlinedIcon />,
        permission: PermissionEnum.MY_SERVICES_VIEW,
      },
      {
        label: "Produse",
        route: "/admin/my-business/products",
        icon: <ShoppingBagOutlinedIcon />,
        permission: PermissionEnum.MY_PRODUCTS_VIEW,
      },
      {
        label: "Angajați",
        route: "/admin/my-business/employees",
        icon: <PeopleAltOutlinedIcon />,
        permission: PermissionEnum.MY_EMPLOYEES_VIEW,
      },
    ],
    []
  );

  const nomenclaturesRoutes: ScrollBookerRoute[] = React.useMemo(
    () => [
      {
        label: "Validează afacerea",
        route: "/admin/businesses/approve",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Roluri și permisiuni",
        route: "/admin/nomenclatures/roles-and-permissions",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Domeniu Business",
        route: "/admin/nomenclatures/business-domains",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Tip Business",
        route: "/admin/nomenclatures/business-types",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Domeniu Serviciu",
        route: "/admin/nomenclatures/service-domains",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Servicii",
        route: "/admin/nomenclatures/services",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Filtre",
        route: "/admin/nomenclatures/filters",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Profesii",
        route: "/admin/nomenclatures/professions",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
      {
        label: "Monede",
        route: "/admin/nomenclatures/currencies",
        icon: <PlaylistAddCheckOutlinedIcon />,
        permission: PermissionEnum.NO_PROTECTION,
      },
    ],
    []
  );

  const styles = React.useMemo(
    () => ({
      button: {
        width: "100%",
        px: isCollapsed ? 0 : 1.5,
        py: 1.25,
        borderRadius: 2,
        justifyContent: isCollapsed ? "center" : "flex-start",
        gap: isCollapsed ? 0 : 1.25,
        transition: "none !important",
        bgcolor: "transparent",
        "&.Mui-selected": { bgcolor: "transparent !important" },
        "&:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },
      iconContainer: (selected: boolean) => ({
        minWidth: isCollapsed ? 0 : 40,
        display: "flex",
        justifyContent: "center",
        color: selected ? "primary.main" : "text.secondary",
        "& svg": { fontSize: 28 },
        transition: "none !important",
      }),
      textHeader: {
        fontSize: 14,
        fontWeight: 700,
        color: "text.disabled",
        textTransform: "uppercase",
        letterSpacing: "1px",
        whiteSpace: "nowrap",
      },
      textItem: (selected: boolean) => ({
        fontSize: 17,
        fontWeight: 600,
        color: selected ? "primary.main" : "text.secondary",
        whiteSpace: "nowrap",
      }),
      separator: {
        height: "1px",
        bgcolor: "divider",
        my: 2,
        mx: 2,
        display: isCollapsed ? "block" : "none",
      },
    }),
    [isCollapsed]
  );

  const renderRouteList = (routes: ScrollBookerRoute[]) => (
    <List component="div" disablePadding>
      {routes.map((route, i) => {
        if (route.route === "/admin/my-business/employees" && !hasEmployees)
          return null;
        const selected = isSelected(route.route);

        return (
          <Protected key={i} permission={route.permission}>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={(e) => onNavigate(route.route, e)}
                selected={selected}
                sx={styles.button}
              >
                <ListItemIcon sx={styles.iconContainer(selected)}>
                  {route.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={
                      <Typography sx={styles.textItem(selected)}>
                        {route.label}
                      </Typography>
                    }
                  />
                )}
              </ListItemButton>
            </ListItem>
          </Protected>
        );
      })}
    </List>
  );

  return (
    <div>
      {/* SECȚIUNE ADMINISTRARE */}
      <Protected permission="MY_BUSINESS_ROUTES_VIEW">
        {!isCollapsed ? (
          <ListItemButton
            onClick={() => setOpenMyBusiness((v) => !v)}
            sx={{ ...styles.button, my: 1 }}
          >
            <ListItemText
              primary="Administrare"
              slotProps={{ primary: { sx: styles.textHeader } }}
            />
            {openMyBusiness ? (
              <ExpandLess sx={{ color: "text.disabled" }} />
            ) : (
              <ExpandMore sx={{ color: "text.disabled" }} />
            )}
          </ListItemButton>
        ) : (
          <Box sx={styles.separator} />
        )}

        <Collapse in={isCollapsed ? true : openMyBusiness} timeout="auto">
          {renderRouteList(adminRoutes)}
        </Collapse>
      </Protected>

      <Protected permission="NOMENCLATURES_VIEW">
        {!isCollapsed ? (
          <ListItemButton
            onClick={() => setOpenNomenclatures((v) => !v)}
            sx={{ ...styles.button, my: 1 }}
          >
            <ListItemText
              primary="SuperAdmin"
              slotProps={{ primary: { sx: styles.textHeader } }}
            />
            {openNomenclatures ? (
              <ExpandLess sx={{ color: "text.disabled" }} />
            ) : (
              <ExpandMore sx={{ color: "text.disabled" }} />
            )}
          </ListItemButton>
        ) : (
          <Box sx={styles.separator} />
        )}

        <Collapse in={isCollapsed ? true : openNomenclatures} timeout="auto">
          {renderRouteList(nomenclaturesRoutes)}
        </Collapse>
      </Protected>
    </div>
  );
};

export default memo(AdminRoutes);
