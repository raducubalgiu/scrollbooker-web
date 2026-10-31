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
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

import MyBusinessCard from "./MyBusinessCard";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { AppRoutes } from "@/utils/routes";
import { Session } from "next-auth";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

type BusinessCardItem = {
  title: string;
  description: string;
  icon: React.ReactNode;
  permission: PermissionEnum;
  href: string;
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

  const pages = useMemo<BusinessCardItem[]>(
    () => [
      {
        title: "Dashboard",
        description: "Statistici despre rezervări și postări",
        icon: <DashboardOutlinedIcon />,
        permission: PermissionEnum.MY_DASHBOARD_VIEW,
        href: AppRoutes.myDashboard(),
      },
      {
        title: "Înregistrări nefinalizate",
        description: "Useri care nu au finalizat onboarding-ul",
        icon: <PersonOffOutlinedIcon />,
        href: AppRoutes.unfinishedRegistrations(),
        permission: PermissionEnum.UNFINISHED_REGISTRATIONS_VIEW,
      },
      {
        title: "Probleme semnalate",
        description: "Rapoartele trimise de utilizatori",
        icon: <ReportProblemOutlinedIcon />,
        href: AppRoutes.reportedProblems(),
        permission: PermissionEnum.PROBLEMS_VIEW,
      },
      {
        title: "Afaceri în aprobare",
        description: "Lista de afaceri ce urmează a fi revizuite",
        icon: <ApartmentOutlinedIcon />,
        permission: PermissionEnum.NOMENCLATURES_VIEW,
        href: AppRoutes.approve(),
      },
      {
        title: "Detalii afacere",
        description: "Detalii despre afacerea mea",
        icon: <LocationOnOutlinedIcon />,
        permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
        href: AppRoutes.myBusinessDetails(),
      },
      {
        title: "Program de lucru",
        description: "Detalii despre programul meu",
        icon: <ScheduleOutlinedIcon />,
        permission: PermissionEnum.MY_SCHEDULES_VIEW,
        href: AppRoutes.mySchedules(),
      },
      {
        title: "Categorii",
        description: "Detalii despre categoriile mele de servicii",
        icon: <BookOutlinedIcon />,
        permission: PermissionEnum.MY_SERVICES_VIEW,
        href: AppRoutes.myServices(),
      },
      {
        title: "Servicii",
        description: "Detalii despre serviciile mele",
        icon: <ShoppingBagOutlinedIcon />,
        permission: PermissionEnum.MY_PRODUCTS_VIEW,
        href: AppRoutes.myProducts(),
      },
      {
        title: "Calendar",
        description: "Calendarul meu de programări",
        icon: <CalendarTodayOutlinedIcon />,
        href: AppRoutes.calendar(),
        permission: PermissionEnum.MY_CALENDAR_VIEW,
      },
      {
        title: "Angajați",
        description: "Angajați și cereri de angajare",
        icon: <PeopleOutlineOutlinedIcon />,
        href: AppRoutes.myEmployees(),
        permission: PermissionEnum.MY_EMPLOYEES_VIEW,
      },
    ],
    []
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
    <MainLayout hideAction title="Afacerea mea">
      <Box sx={{ height: "100%" }}>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: "100%" }}>
          {visiblePages.map((page, index) => (
            <Grid key={index} size={{ xs: 6, md: 4 }}>
              <MyBusinessCard
                title={page.title}
                description={page.description}
                icon={page.icon}
                href={page.href}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default MyBusinessModule;
