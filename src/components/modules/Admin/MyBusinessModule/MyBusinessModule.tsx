"use client";

import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

import MyBusinessCard from "./MyBusinessCard";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { AppRoutes } from "@/utils/routes";
import { Session } from "next-auth";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

type BusinessCardItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
  navigate: () => void;
};

type MyBusinessModuleProps = {
  session: Session;
};

const MyBusinessModule = ({ session }: MyBusinessModuleProps) => {
  const {
    has_employees: hasEmployees,
    is_employee: isEmployee,
    permissions,
  } = session;

  const { navigateTo } = useAppNavigation();

  const pages = useMemo<BusinessCardItem[]>(
    () => [
      {
        title: "Dashboard",
        description: "Statistici despre rezervări și postări",
        icon: <DashboardOutlinedIcon />,
        permission: PermissionEnum.MY_DASHBOARD_VIEW,
        navigate: () => navigateTo(AppRoutes.myDashboard()),
      },
      {
        title: "Afaceri în aprobare",
        description: "Lista de afaceri ce urmează a fi revizuite",
        icon: <ApartmentOutlinedIcon />,
        permission: PermissionEnum.NOMENCLATURES_VIEW,
        navigate: () => navigateTo(AppRoutes.approve()),
      },
      {
        title: "Detalii afacere",
        description: "Detalii despre afacerea mea",
        icon: <LocationOnOutlinedIcon />,
        permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
        navigate: () => navigateTo(AppRoutes.myBusinessDetails()),
      },
      {
        title: "Program de lucru",
        description: "Detalii despre programul meu",
        icon: <ScheduleOutlinedIcon />,
        permission: PermissionEnum.MY_SCHEDULES_VIEW,
        navigate: () => navigateTo(AppRoutes.mySchedules()),
      },
      {
        title: "Categorii",
        description: "Detalii despre categoriile mele de servicii",
        icon: <BookOutlinedIcon />,
        permission: PermissionEnum.MY_SERVICES_VIEW,
        navigate: () => navigateTo(AppRoutes.myServices()),
      },
      {
        title: "Servicii",
        description: "Detalii despre serviciile mele",
        icon: <ShoppingBagOutlinedIcon />,
        permission: PermissionEnum.MY_PRODUCTS_VIEW,
        navigate: () => navigateTo(AppRoutes.myProducts()),
      },
      {
        title: "Calendar",
        description: "Calendarul meu de programări",
        icon: <CalendarTodayOutlinedIcon />,
        navigate: () => navigateTo(AppRoutes.calendar()),
        permission: PermissionEnum.MY_CALENDAR_VIEW,
      },
      {
        title: "Angajați",
        description: "Angajați și cereri de angajare",
        icon: <PeopleOutlineOutlinedIcon />,
        navigate: () => navigateTo(AppRoutes.myEmployees()),
        permission: PermissionEnum.MY_EMPLOYEES_VIEW,
      },
    ],
    [navigateTo]
  );

  const visiblePages = useMemo(() => {
    return pages.filter((page) => {
      if (
        page.permission === PermissionEnum.MY_EMPLOYEES_VIEW &&
        !hasEmployees
      ) {
        return false;
      }
      if (page.permission === PermissionEnum.MY_SCHEDULES_VIEW && !isEmployee) {
        return false;
      }

      return page.permission && permissions?.includes(page.permission);
    });
  }, [pages, hasEmployees, isEmployee, permissions]);

  return (
    <MainLayout hideAction showHeader={false}>
      <Box sx={{ height: "100%" }}>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: "100%" }}>
          {visiblePages.map((page, index) => (
            <Grid key={index} size={{ xs: 6, md: 4 }}>
              <MyBusinessCard
                title={page.title}
                description={page.description}
                icon={page.icon}
                onClick={page.navigate}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default MyBusinessModule;
