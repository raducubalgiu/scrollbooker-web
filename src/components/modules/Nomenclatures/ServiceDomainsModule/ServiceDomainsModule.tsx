"use client";

import Table from "@/components/core/Table/Table";
import { ServiceDomainsType } from "../../../../models/nomenclatures/ServiceDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";

export default function ServiceDomainsModule() {
	const {
		data,
		isLoading,
		onCreatingRowSave,
		pagination,
		setPagination,
		onEditingRowSave,
		onDeletingRowSave,
	} = useTableHandlers<ServiceDomainsType>({
		route: "nomenclatures/service-domains",
	});

	const serviceDomainsColumns = useMemo<MRT_ColumnDef<ServiceDomainsType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
				enableEditing: false,
			},
			{
				accessorKey: "name",
				header: "Name",
				size: 300,
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={100}
					/>
				),
			},
			{
				accessorKey: "created_at",
				header: "Created_at",
				enableEditing: false,
			},
			{
				accessorKey: "updated_at",
				header: "updated_at",
				enableEditing: false,
			},
		],
		[]
	);

	const serviceColumns = useMemo<MRT_ColumnDef<ServiceType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
			},
			{
				accessorKey: "name",
				header: "Name",
				size: 300,
			},
		],
		[]
	);

	return (
		<MainLayout title="Service Domains" hideAction>
			<Table<ServiceDomainsType>
				data={data?.results}
				rowCount={data?.count}
				columns={serviceDomainsColumns}
				manualPagination
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				onPaginationChange={setPagination}
				renderDetailPanel={({ row }) => (
					<Table
						data={row.original.services}
						columns={serviceColumns}
						enableTopToolbar={false}
						enableEditing={false}
						muiTableHeadCellProps={{
							sx: {
								bgcolor: "surface.main",
								color: "neutral.100",
							},
						}}
					/>
				)}
			/>
		</MainLayout>
	);
}
