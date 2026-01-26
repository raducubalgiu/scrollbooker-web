"use client";

import React, { useMemo, useState } from "react";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import EmploymentRequestsModal from "./EmploymentRequestsModal/EmploymentRequestsModal";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import {
	MaterialReactTable,
	MRT_ColumnDef,
	MRT_Row,
} from "material-react-table";

import { ProfessionType } from "@/ts/models/Profession/ProfessionType";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import dayjs from "dayjs";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Close } from "@mui/icons-material";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";
import { UserMiniType } from "@/ts/models/User/UserMiniType";

type EmploymentRequest = {
	id: number;
	status: string;
	employee: UserMiniType;
	employer: UserMiniType;
	profession: ProfessionType;
	created_at: string;
};

type OpenConfirmationState = {
	openModal: boolean;
	employment_request_id: null | number;
};

export default function EmploymentRequestsModule() {
	const [open, setOpen] = useState(false);
	const [confirmation, setConfirmation] = useState<OpenConfirmationState>({
		openModal: false,
		employment_request_id: null,
	});

	const {
		data: employmentRequests,
		isLoading,
		refetch,
	} = useCustomQuery<EmploymentRequest[]>({
		key: ["get-employment-requests"],
		url: "/api/employment-requests",
	});

	const { mutate: handleDelete, isPending: isLoadingDelete } = useMutate({
		key: ["delete-employment-request"],
		url: "/api/employment-requests",
		method: "DELETE",
		options: {
			onSuccess: () => {
				setConfirmation({ openModal: false, employment_request_id: null });
				refetch();
			},
		},
	});

	const columns = useMemo<MRT_ColumnDef<EmploymentRequest>[]>(
		() => [
			{
				accessorKey: "employee.username",
				header: "Viitorul angajat",
				Cell: ({ row }) => {
					return (
						<CustomStack justifyContent="flex-start">
							<Avatar sx={{ width: 30, height: 30, mr: 2.5 }} />
							{row.original.employee.username}
						</CustomStack>
					);
				},
			},
			{
				accessorKey: "profession.name",
				header: "Funcția",
			},
			{
				accessorKey: "created_at",
				header: "Data",
				Cell: ({ row }) => dayjs(row.original.created_at).format("DD-MM-YYYY"),
			},
			{
				accessorKey: "status",
				header: "Status",
				Cell: () => "În așteptare",
			},
		],
		[]
	);

	const renderRowActions = ({ row }: { row: MRT_Row<EmploymentRequest> }) => (
		<Tooltip title="Anulează cererea">
			<IconButton
				onClick={() =>
					setConfirmation({
						openModal: true,
						employment_request_id: row.original.id,
					})
				}
			>
				<Close color="secondary" />
			</IconButton>
		</Tooltip>
	);

	return (
		<MainLayout
			title="Cereri de angajare în așteptare"
			actionTitle="Trimite o cerere"
			onOpenModal={() => setOpen(true)}
		>
			<ConfirmationModal
				open={confirmation.openModal}
				handleClose={() =>
					setConfirmation({ openModal: false, employment_request_id: null })
				}
				handleSubmit={() =>
					handleDelete({ id: confirmation.employment_request_id })
				}
				title="Ești sigur?"
				message="Ești sigur că dorești să anulezi această cerere?"
				isLoading={isLoadingDelete}
			/>
			<EmploymentRequestsModal
				open={open}
				handleClose={() => {
					setOpen(false);
					refetch();
				}}
			/>
			<MaterialReactTable
				data={employmentRequests ?? []}
				columns={columns}
				enableFilters={false}
				enableSorting={false}
				enableColumnActions={false}
				localization={MRT_Localization_RO}
				state={{ isLoading }}
				enableRowActions={true}
				positionActionsColumn="last"
				renderRowActions={renderRowActions}
			/>
		</MainLayout>
	);
}
