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

type AdminRoutesProps = {
  hasEmployees: boolean;
  isSelected: (route: string) => boolean;
  isCollapsed: boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

type NavigationItem = {
  label: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
  route: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const DRAWER_PADDING_X = 15;
const ICON_SLOT_SIZE = 72;
const ADMIN_ITEM_HEIGHT = 48;
const ADMIN_ICON_SIZE = 26;
const ADMIN_FONT_SIZE = 16;
const ADMIN_GAP = 8;

const AdminRoutes = ({
  hasEmployees,
  isSelected,
  isCollapsed,
  onNavigate,
}: AdminRoutesProps) => {
  const [openMyBusiness, setOpenMyBusiness] = React.useState(true);
  const [openNomenclatures, setOpenNomenclatures] = React.useState(false);

  const adminRoutes: NavigationItem[] = React.useMemo(
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
        label: "Categorii",
        route: "/admin/my-business/services",
        icon: <AssignmentTurnedInOutlinedIcon />,
        permission: PermissionEnum.MY_SERVICES_VIEW,
      },
      {
        label: "Serviciile mele",
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

  const nomenclaturesRoutes: NavigationItem[] = React.useMemo(
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
        minHeight: ADMIN_ITEM_HEIGHT,
        borderRadius: 2,
        px: `${DRAWER_PADDING_X}px`,
        py: 0.5,
        display: "grid",
        gridTemplateColumns: `${ICON_SLOT_SIZE}px minmax(0, 1fr)`,
        alignItems: "center",
        columnGap: `${ADMIN_GAP}px`,
        justifyContent: "flex-start",
        bgcolor: "transparent",
        transition: "none !important",
        "&.Mui-selected": {
          bgcolor: "transparent !important",
        },
        "&:hover, &.Mui-selected:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },

      getIconStyles: (selected: boolean) => ({
        minWidth: "unset",
        width: ICON_SLOT_SIZE,
        height: ADMIN_ITEM_HEIGHT,
        m: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: selected ? "primary.main" : "text.secondary",
        "& svg": {
          fontSize: ADMIN_ICON_SIZE,
        },
      }),

      textWrapper: {
        minWidth: 0,
        overflow: "hidden",
        width: isCollapsed ? 0 : "auto",
        opacity: isCollapsed ? 0 : 1,
        pointerEvents: isCollapsed ? "none" : "auto",
      },

      textHeaderRow: {
        minHeight: 40,
        px: `${DRAWER_PADDING_X}px`,
        mt: 1,
        mb: 0.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 2,
      },

      textHeader: {
        fontSize: 13,
        fontWeight: 700,
        color: "text.disabled",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },

      getTextItemStyles: (selected: boolean) => ({
        fontSize: ADMIN_FONT_SIZE,
        fontWeight: 600,
        color: selected ? "primary.main" : "text.secondary",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }),

      separator: {
        height: "1px",
        bgcolor: "divider",
        my: 2,
        mx: `${DRAWER_PADDING_X}px`,
        display: isCollapsed ? "block" : "none",
      },
    }),
    [isCollapsed]
  );

  const renderRouteList = (routes: NavigationItem[]) => (
    <List component="div" disablePadding>
      {routes.map((route) => {
        if (route.route === "/admin/my-business/employees" && !hasEmployees) {
          return null;
        }

        const selected = isSelected(route.route);

        return (
          <Protected key={route.route} permission={route.permission}>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={(e) => onNavigate(route.route, e)}
                selected={selected}
                sx={styles.button}
              >
                <ListItemIcon sx={styles.getIconStyles(selected)}>
                  {route.icon}
                </ListItemIcon>

                <Box sx={styles.textWrapper}>
                  <ListItemText
                    primary={
                      <Typography sx={styles.getTextItemStyles(selected)}>
                        {route.label}
                      </Typography>
                    }
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          </Protected>
        );
      })}
    </List>
  );

  return (
    <div>
      <Protected permission="MY_BUSINESS_ROUTES_VIEW">
        {!isCollapsed ? (
          <ListItemButton
            onClick={() => setOpenMyBusiness((v) => !v)}
            sx={styles.textHeaderRow}
          >
            <Typography sx={styles.textHeader}>Administrare</Typography>
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
            sx={styles.textHeaderRow}
          >
            <Typography sx={styles.textHeader}>SuperAdmin</Typography>
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
