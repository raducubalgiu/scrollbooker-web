"use client";

import React from "react";
import AppointmentsModule from "./AppointmentsModule";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const AppointmentsWrapper = () => {
  const router = useRouter();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Box
      ref={scrollRef}
      sx={{ height: "100vh", overflowY: "auto", width: "100%" }}
    >
      <AppointmentsModule
        scrollRootRef={scrollRef}
        onNavigateToAppointment={(id) => router.push(`/appointments/${id}`)}
      />
    </Box>
  );
};

export default AppointmentsWrapper;
