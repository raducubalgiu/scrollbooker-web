"use client";

import React from "react";
import AppointmentsModule from "./AppointmentsModule";
import { Box } from "@mui/material";

const AppointmentsWrapper = () => {
	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<AppointmentsModule />
		</Box>
	);
};

export default AppointmentsWrapper;
