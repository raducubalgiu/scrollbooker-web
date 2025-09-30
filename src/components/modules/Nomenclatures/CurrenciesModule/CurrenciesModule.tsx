"use client";

import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { CurrencyType } from "@/ts/models/nomenclatures/CurrencyType";
import Table from "@/components/core/Table/Table";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";

export default function CurrenciesModule() {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<CurrencyType>({ route: "nomenclatures/currencies" });

	const columns = useMemo<MRT_ColumnDef<CurrencyType>[]>(
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
				accessorKey: "active",
				header: "Active",
				Cell: ({ row }) => (row.original.active ? "True" : "False"),
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
		<MainLayout title="Monede" hideAction>
			<Table<CurrencyType>
				data={data?.results}
				rowCount={data?.count}
				columns={columns}
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
