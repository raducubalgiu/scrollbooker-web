"use client";

import React, { useState } from "react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper, Stack, Typography } from "@mui/material";
import EmploymentRequestsModal from "./EmploymentRequestsModal/EmploymentRequestsModal";

export default function EmploymentRequestsModule() {
	const [open, setOpen] = useState(false);

	return (
		<MainLayout
			title="Cereri de angajare în așteptare"
			actionTitle="Trimite o cerere"
			onOpenModal={() => setOpen(true)}
		>
			<EmploymentRequestsModal open={open} handleClose={() => setOpen(false)} />
			<Paper sx={{ p: 2.5 }}>
				<Stack alignItems="center">
					<Typography>Nu ai nici o cerere de angajare în așteptare</Typography>
				</Stack>
			</Paper>
		</MainLayout>
	);
}
