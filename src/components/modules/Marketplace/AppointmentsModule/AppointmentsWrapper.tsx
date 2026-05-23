"use client";

import React from "react";
import AppointmentsModule from "./AppointmentsModule";
import { Box } from "@mui/material";
import { AppRoutes, useAppNavigation } from "@/utils/routes";

const AppointmentsWrapper = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const { navigateTo } = useAppNavigation();

  return (
    <Box ref={scrollRef} sx={{ height: "100vh", width: "100%" }}>
      <AppointmentsModule
        scrollRootRef={scrollRef}
        onNavigateToAppointment={(id) =>
          navigateTo(AppRoutes.appointmentDetails(id))
        }
      />
    </Box>
  );
};

export default AppointmentsWrapper;
