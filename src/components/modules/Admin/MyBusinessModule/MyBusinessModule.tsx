"use client";

import React, { useMemo } from "react";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/material";

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
    user_id,
    business_owner_id,
    permissions,
  } = session;

  const { navigateTo } = useAppNavigation();

  const pages = useMemo<BusinessCardItem[]>(
    () => [
      {
        title: "Detalii afacere",
        description:
          "Vizualizează și editează locația, datele de contact și informațiile generale ale companiei.",
        icon: <LocationOnOutlinedIcon />,
        permission: PermissionEnum.MY_BUSINESS_LOCATION_VIEW,
        navigate: () => navigateTo(AppRoutes.myBusinessDetails()),
      },
      {
        title: "Program de lucru",
        description:
          "Setează și gestionează intervalele orare de activitate și zilele libere.",
        icon: <ScheduleOutlinedIcon />,
        permission: PermissionEnum.MY_SCHEDULES_VIEW,
        navigate: () => navigateTo(AppRoutes.mySchedules()),
      },
      {
        title: "Categorii",
        description:
          "Organizează serviciile oferite în categorii personalizate pentru o structură clară.",
        icon: <BookOutlinedIcon />,
        permission: PermissionEnum.MY_SERVICES_VIEW,
        navigate: () => navigateTo(AppRoutes.myServices()),
      },
      {
        title: "Servicii",
        description:
          "Adaugă, editează sau șterge serviciile disposable pentru programare.",
        icon: <ShoppingBagOutlinedIcon />,
        permission: PermissionEnum.MY_PRODUCTS_VIEW,
        navigate: () => navigateTo(AppRoutes.myProducts()),
      },
      {
        title: "Calendar",
        description:
          "Gestionează rezervările primite și organizează activitățile zilnice.",
        icon: <CalendarTodayOutlinedIcon />,
        navigate: () => navigateTo(AppRoutes.calendar()),
        permission: PermissionEnum.MY_CALENDAR_VIEW,
      },
      {
        title: "Angajați",
        description:
          "Administrează echipa de specialiști și cererile de angajare active.",
        icon: <PeopleOutlineOutlinedIcon />,
        navigate: () => navigateTo(AppRoutes.myEmployees()),
        permission: PermissionEnum.MY_EMPLOYEES_VIEW,
      },
    ],
    [navigateTo]
  );

  const visiblePages = useMemo(() => {
    const isEmployee = business_owner_id !== user_id;

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
      const hasValidPermission =
        page.permission && permissions?.includes(page.permission);

      return hasValidPermission;
    });
  }, [pages, hasEmployees]);

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
