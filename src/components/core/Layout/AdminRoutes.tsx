import React, { memo } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Protected from "@/components/cutomized/Protected/Protected";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from "@mui/material";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { ScrollBookerRoute } from "./MarketplaceDrawer";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";

type AdminRoutesProps = {
  hasEmployees: boolean;
  isSelected: (route: string) => boolean;
  onNavigate: (
    route: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
};

const AdminRoutes = ({
  hasEmployees,
  isSelected,
  onNavigate,
}: AdminRoutesProps) => {
  const [openMyBusiness, setOpenMyBusiness] = React.useState(true);
  const [openNomenclatures, setOpenNomenclatures] = React.useState(false);

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

  const stylesAdmin = React.useMemo(
    () => ({
      button: {
        width: "100%",
        px: 1.5,
        py: 1.25,
        borderRadius: 2,
        justifyContent: "flex-start",
        gap: 1.25,
        transition: "background-color 150ms ease, transform 120ms ease",
        bgcolor: "transparent",
        "&.Mui-selected": {
          bgcolor: "transparent !important",
        },
        "&:hover, &.Mui-selected:hover": {
          bgcolor: (theme: Theme) => `${theme.palette.action.hover} !important`,
        },
      },
      iconDefault: { color: "text.secondary", "& svg": { fontSize: 25 } },
      iconSelected: { color: "primary.main", "& svg": { fontSize: 25 } },
      textDefault: { fontSize: 17, fontWeight: 600, color: "text.secondary" },
      textSelected: { fontSize: 17, fontWeight: 600, color: "primary.main" },
    }),
    []
  );

  return (
    <div>
      <Protected permission="MY_BUSINESS_ROUTES_VIEW">
        <ListItemButton
          onClick={() => setOpenMyBusiness((v) => !v)}
          sx={{ ...stylesAdmin.button, my: 1.5 }}
        >
          <ListItemText
            primary="Administrare"
            slotProps={{
              primary: { sx: stylesAdmin.textDefault },
            }}
          />
          {openMyBusiness ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMyBusiness} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {adminRoutes.map((route, i) => {
              if (
                route.route === "/admin/my-business/employees" &&
                !hasEmployees
              ) {
                return null;
              }

              return (
                <Protected key={i} permission={route.permission}>
                  <ListItem disablePadding sx={{ px: 0 }}>
                    <ListItemButton
                      onClick={(e) => onNavigate(route.route, e)}
                      selected={isSelected(route.route)}
                      sx={stylesAdmin.button}
                    >
                      <ListItemIcon sx={stylesAdmin.iconDefault}>
                        {route.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={stylesAdmin.textDefault}>
                            {route.label}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                </Protected>
              );
            })}
          </List>
        </Collapse>
      </Protected>

      <Protected permission="NOMENCLATURES_VIEW">
        <ListItemButton
          onClick={() => setOpenNomenclatures((v) => !v)}
          sx={{ ...stylesAdmin.button, my: 1.5 }}
        >
          <ListItemText
            primary="SuperAdmin"
            slotProps={{
              primary: { sx: stylesAdmin.textDefault },
            }}
          />
          {openNomenclatures ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openNomenclatures} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {nomenclaturesRoutes.map((route, i) => {
              return (
                <ListItem disablePadding sx={{ px: 0 }} key={i}>
                  <ListItemButton
                    onClick={(e) => onNavigate(route.route, e)}
                    selected={isSelected(route.route)}
                    sx={stylesAdmin.button}
                  >
                    <ListItemIcon sx={stylesAdmin.iconDefault}>
                      <PlaylistAddCheckOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={stylesAdmin.textDefault}>
                          {route.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      </Protected>
    </div>
  );
};

export default memo(AdminRoutes);
