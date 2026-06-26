"use client";

import React from "react";
import AppointmentsModule from "./AppointmentsModule";
import { Box } from "@mui/material";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";

const AppointmentsWrapper = () => {
	const { navigateTo } = useAppNavigation();

	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<AppointmentsModule
				onNavigateToAppointment={id =>
					navigateTo(AppRoutes.appointmentDetails(id))
				}
			/>
		</Box>
	);
};

export default AppointmentsWrapper;
