"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";

export default function ServicesModule() {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ServiceType>({ route: "nomenclatures/services" });

	const servicesColumns = useMemo<MRT_ColumnDef<ServiceType>[]>(
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
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={50}
					/>
				),
			},
			{
				accessorKey: "keywords",
				header: "Keywords",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						value={row.original.keywords}
						required
					/>
				),
			},
			{
				accessorKey: "created_at",
				enableEditing: false,
				header: "Created_at",
			},
		],
		[]
	);

	return (
		<MainLayout title="Services" hideAction>
			<Table<ServiceType>
				data={data?.results}
				rowCount={data?.count}
				columns={servicesColumns}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				manualPagination={true}
				onPaginationChange={setPagination}
				state={{ pagination, isLoading }}
			/>
		</MainLayout>
	);
}
