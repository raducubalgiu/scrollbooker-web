import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export default function EmploymentRequests() {
	return (
		<MainLayout title="Cereri de angajare" actionTitle="Trimite o cerere">
			<Paper sx={{ p: 2.5 }}>
				<Stack alignItems="center">
					<Typography>Nu ai trimis nici o cerere de angajare</Typography>
				</Stack>
			</Paper>
		</MainLayout>
	);
}
