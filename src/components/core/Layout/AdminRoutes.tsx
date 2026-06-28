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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import AddModeratorOutlinedIcon from "@mui/icons-material/AddModeratorOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Session } from "next-auth";
import { AppRoutes, AppRouteValues } from "@/utils/routes";
import {
  DRAWER_PADDING_X,
  ICON_SLOT_SIZE,
  ADMIN_ITEM_HEIGHT,
  ADMIN_ICON_SIZE,
  ADMIN_FONT_SIZE,
  ADMIN_GAP,
} from "./Drawer.constants";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import Protected from "@/components/cutomized/Protected/Protected";

type AdminRoutesProps = {
  session: Session | null;
  isSelected: (route: AppRouteValues) => boolean;
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
  route: AppRouteValues;
};

// Static — defined outside component, never recreated
const ADMIN_ROUTES: NavigationItem[] = [
  {
    label: "Calendar",
    route: AppRoutes.calendar(),
    icon: <CalendarMonthIcon />,
    permission: PermissionEnum.MY_CALENDAR_VIEW,
  },
  {
    label: "Dashboard",
    route: AppRoutes.myDashboard(),
    icon: <DashboardOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Detalii Business",
    route: AppRoutes.myBusinessDetails(),
    icon: <PlaceOutlinedIcon />,
    permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
  },
  {
    label: "Programul de lucru",
    route: AppRoutes.mySchedules(),
    icon: <ScheduleIcon />,
    permission: PermissionEnum.MY_SCHEDULES_VIEW,
  },
  {
    label: "Categorii",
    route: AppRoutes.myServices(),
    icon: <AssignmentTurnedInOutlinedIcon />,
    permission: PermissionEnum.MY_SERVICES_VIEW,
  },
  {
    label: "Serviciile mele",
    route: AppRoutes.myProducts(),
    icon: <ShoppingBagOutlinedIcon />,
    permission: PermissionEnum.MY_PRODUCTS_VIEW,
  },
  {
    label: "Angajați",
    route: AppRoutes.myEmployees(),
    icon: <PeopleAltOutlinedIcon />,
    permission: PermissionEnum.MY_EMPLOYEES_VIEW,
  },
];

const NOMENCLATURES_ROUTES: NavigationItem[] = [
  {
    label: "Validează afacerea",
    route: AppRoutes.approve(),
    icon: <BeenhereOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Roluri și permisiuni",
    route: AppRoutes.rolesAndPermissions(),
    icon: <AddModeratorOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Domeniu Business",
    route: AppRoutes.businessDomains(),
    icon: <PlaylistAddCheckOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Tip Business",
    route: AppRoutes.businessTypes(),
    icon: <PlaylistAddCheckOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Domeniu Serviciu",
    route: AppRoutes.serviceDomains(),
    icon: <PlaylistAddCheckOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Categorie Serviciu",
    route: AppRoutes.services(),
    icon: <PlaylistAddCheckOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Filtre",
    route: AppRoutes.filters(),
    icon: <FilterAltOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Profesii",
    route: AppRoutes.professions(),
    icon: <BusinessCenterOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Monede",
    route: AppRoutes.currencies(),
    icon: <MonetizationOnOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
  {
    label: "Consents",
    route: AppRoutes.consents(),
    icon: <FeedOutlinedIcon />,
    permission: PermissionEnum.NO_PROTECTION,
  },
];

const getIconStyles = (selected: boolean) => ({
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
});

const getTextItemStyles = (selected: boolean) => ({
  fontSize: ADMIN_FONT_SIZE,
  fontWeight: 600,
  color: selected ? "primary.main" : "text.secondary",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const buttonSx = {
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
};

const textHeaderRowSx = {
  minHeight: 40,
  px: `${DRAWER_PADDING_X}px`,
  mt: 1,
  mb: 0.5,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 2,
};

const textHeaderSx = {
  fontSize: 13,
  fontWeight: 700,
  color: "text.disabled",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const separatorSx = {
  height: "1px",
  bgcolor: "divider",
  my: 2,
  mx: `${DRAWER_PADDING_X}px`,
};

const AdminRoutes = ({
  session,
  isSelected,
  isCollapsed,
  onNavigate,
}: AdminRoutesProps) => {
  const [openMyBusiness, setOpenMyBusiness] = React.useState(true);
  const [openNomenclatures, setOpenNomenclatures] = React.useState(false);

  const isEmployee = session?.user_id !== session?.business_owner_id;
  const hasEmployees = session?.has_employees ?? false;

  const renderRouteList = (routes: NavigationItem[]) => (
    <List component="div" disablePadding>
      {routes.map((route) => {
        if (route.route === AppRoutes.myEmployees() && !hasEmployees) {
          return null;
        }

        if (route.route === AppRoutes.mySchedules() && !isEmployee) {
          return null;
        }

        const selected = isSelected(route.route);

        return (
          <Protected key={route.route} permission={route.permission}>
            <ListItem disablePadding sx={{ px: 0 }}>
              <ListItemButton
                onClick={(e) => onNavigate(route.route, e)}
                selected={selected}
                sx={buttonSx}
              >
                <ListItemIcon sx={getIconStyles(selected)}>
                  {route.icon}
                </ListItemIcon>

                <Box
                  sx={{
                    minWidth: 0,
                    overflow: "hidden",
                    width: isCollapsed ? 0 : "auto",
                    opacity: isCollapsed ? 0 : 1,
                    pointerEvents: isCollapsed ? "none" : "auto",
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography sx={getTextItemStyles(selected)}>
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
            sx={textHeaderRowSx}
          >
            <Typography sx={textHeaderSx}>Administrare</Typography>
            {openMyBusiness ? (
              <ExpandLess sx={{ color: "text.disabled" }} />
            ) : (
              <ExpandMore sx={{ color: "text.disabled" }} />
            )}
          </ListItemButton>
        ) : (
          <Box sx={separatorSx} />
        )}

        <Collapse in={isCollapsed ? true : openMyBusiness} timeout="auto">
          {renderRouteList(ADMIN_ROUTES)}
        </Collapse>
      </Protected>

      <Protected permission="NOMENCLATURES_VIEW">
        {!isCollapsed ? (
          <ListItemButton
            onClick={() => setOpenNomenclatures((v) => !v)}
            sx={textHeaderRowSx}
          >
            <Typography sx={textHeaderSx}>SuperAdmin</Typography>
            {openNomenclatures ? (
              <ExpandLess sx={{ color: "text.disabled" }} />
            ) : (
              <ExpandMore sx={{ color: "text.disabled" }} />
            )}
          </ListItemButton>
        ) : (
          <Box sx={separatorSx} />
        )}

        <Collapse in={isCollapsed ? true : openNomenclatures} timeout="auto">
          {renderRouteList(NOMENCLATURES_ROUTES)}
        </Collapse>
      </Protected>
    </div>
  );
};

export default memo(AdminRoutes);
