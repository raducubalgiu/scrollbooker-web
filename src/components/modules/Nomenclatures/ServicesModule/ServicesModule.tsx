/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	MRT_PaginationState,
	MRT_ActionMenuItem,
	MRT_Updater,
	MRT_TableOptions,
	useMaterialReactTable,
	MRT_Row,
	MRT_TableInstance,
} from "material-react-table";
import {
	PaginatedServiceType,
	ServiceType,
} from "../../../../models/nomenclatures/ServiceType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Button } from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

type TableType = {
	table: MRT_TableInstance<ServiceType>;
};

type TableAndRowType = {
	row: MRT_Row<ServiceType>;
	table: MRT_TableInstance<ServiceType>;
};

export default function ServicesModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const {
		data,
		isLoading,
		refetch: refetchServices,
	} = useCustomQuery<PaginatedServiceType>({
		key: ["services", pagination.pageIndex, pagination.pageSize],
		url: `/api/nomenclatures/services`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const { mutateAsync: handleSave, isPending: isPendingCreate } = useMutate({
		key: ["create-service"],
		url: "/api/nomenclatures/services",
		options: {
			onSuccess: () => toast.success("Datele au fost salvate cu succes"),
		},
	});

	const { mutateAsync: handleDelete } = useMutate({
		key: ["delete-service"],
		url: "/api/nomenclatures/services",
		method: "DELETE",
		options: {
			onSuccess: () => toast.success("Serviciul a fost sters cu succes"),
		},
	});

	const columns = useMemo<MRT_ColumnDef<ServiceType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				enableEditing: false,
				size: 50,
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "keywords",
				header: "Keywords",
			},
			{
				accessorKey: "created_at",
				enableEditing: false,
				header: "Created_at",
			},
		],
		[]
	);

	const handlePagination = (updater: MRT_Updater<any>) => {
		const newState = updater(pagination);
		setPagination(newState);
	};

	const onCreatingRowSave: MRT_TableOptions<ServiceType>["onCreatingRowSave"] =
		async ({ values, table }) => {
			await handleSave({
				name: values.name,
				keywords: [values.keywords],
			});
			refetchServices();
			table.setCreatingRow(null);
		};

	const onEditingRowSave: MRT_TableOptions<ServiceType>["onEditingRowSave"] =
		async ({ values, table }) => {
			console.log("VALUES!!!", values);
			table.setEditingRow(null); //exit editing mode
		};

	const renderRowActionMenuItems = ({ row, table }: TableAndRowType) => [
		<MRT_ActionMenuItem
			key={2}
			label="Delete"
			icon={<Delete />}
			onClick={async () => {
				await handleDelete({ serviceId: row.original.id });
				refetchServices();
			}}
			table={table}
		/>,
	];

	const renderTopToolbarCustomActions = ({ table }: TableType) => (
		<Button onClick={() => table.setCreatingRow(true)} variant="contained">
			Adauga
		</Button>
	);

	const icons = {
		SaveIcon: () => <Check color="success" />,
		CancelIcon: () => <CloseIcon color="error" />,
	};

	const table = useMaterialReactTable({
		columns,
		data: data?.results ?? [],
		manualPagination: true,
		onPaginationChange: handlePagination,
		rowCount: data?.count,
		enableEditing: true,
		editDisplayMode: "row",
		createDisplayMode: "row",
		getRowId: row => String(row.id),
		positionActionsColumn: "last",
		onEditingRowSave,
		onCreatingRowSave,
		renderRowActionMenuItems,
		renderTopToolbarCustomActions,
		muiEditTextFieldProps: { variant: "outlined" },
		icons,
		state: {
			pagination,
			isLoading,
			isSaving: isPendingCreate,
		},
	});

	return (
		<MainLayout title="Services" hideAction>
			<MaterialReactTable table={table} />
		</MainLayout>
	);
}
