"use client";

import React, { useMemo, useState } from "react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper, Stack, Typography } from "@mui/material";
import EmploymentRequestsModal from "./EmploymentRequestsModal/EmploymentRequestsModal";
import { useCustomQuery } from "@/hooks/useHttp";
import { isEmpty } from "lodash";
import { MaterialReactTable, MRT_ColumnDef } from "material-react-table";
import { UserInfoType } from "@/models/UserInfoType";
import { ProfessionType } from "@/models/ProfessionType";

type EmploymentRequest = {
	id: number;
	status: string;
	employee: UserInfoType;
	employer: UserInfoType;
	profession: ProfessionType;
};

export default function EmploymentRequestsModule() {
	const [open, setOpen] = useState(false);

	const { data: employmentRequests, isLoading } = useCustomQuery<
		EmploymentRequest[]
	>({
		key: ["get-employment-requests"],
		url: "/api/employment-requests",
	});

	const columns = useMemo<MRT_ColumnDef<EmploymentRequest>[]>(
		() => [
			{
				accessorKey: "employee.username",
				header: "Viitorul angajat",
			},
			{
				accessorKey: "profession.name",
				header: "Funcția",
			},
			{
				accessorKey: "status",
				header: "Status",
				Cell: () => "În așteptare",
			},
		],
		[]
	);

	return (
		<MainLayout
			title="Cereri de angajare în așteptare"
			actionTitle="Trimite o cerere"
			onOpenModal={() => setOpen(true)}
		>
			<EmploymentRequestsModal open={open} handleClose={() => setOpen(false)} />
			{!isLoading && (
				<MaterialReactTable
					data={employmentRequests ?? []}
					columns={columns}
					enableFilters={false}
				/>
			)}
			{!isLoading && isEmpty(employmentRequests) && (
				<Paper sx={{ p: 2.5 }}>
					<Stack alignItems="center">
						<Typography>
							Nu ai nici o cerere de angajare în așteptare
						</Typography>
					</Stack>
				</Paper>
			)}
		</MainLayout>
	);
}
