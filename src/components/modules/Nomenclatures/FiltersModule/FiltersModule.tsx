"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { FilterType } from "@/models/nomenclatures/FilterType";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import SubFiltersModule from "./SubFiltersModule";

export default function FiltersModule() {
	const {
		data: filters,
		isLoading: isLoadingFilters,
		pagination: filtersPagination,
		setPagination: setFiltersPagination,
		onCreatingRowSave: onFilterCreatingRowSave,
		onDeletingRowSave: onFilterDeletingRowSave,
		onEditingRowSave: onFilterEditingRowSave,
	} = useTableHandlers<FilterType>({ route: "nomenclatures/filters" });

	const filtersColumns = useMemo<MRT_ColumnDef<FilterType>[]>(
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
				accessorKey: "created_at",
				header: "Created_at",
				enableEditing: false,
			},
			{
				accessorKey: "updated_at",
				header: "Updated_at",
				enableEditing: false,
			},
		],
		[]
	);

	return (
		<MainLayout title="Filtre" hideAction>
			<Table<FilterType>
				data={filters?.results}
				rowCount={filters?.count}
				columns={filtersColumns}
				manualPagination
				enableFilters={false}
				onDeletingRowSave={onFilterDeletingRowSave}
				onCreatingRowSave={onFilterCreatingRowSave}
				onEditingRowSave={onFilterEditingRowSave}
				onPaginationChange={setFiltersPagination}
				state={{ pagination: filtersPagination, isLoading: isLoadingFilters }}
				renderDetailPanel={({ row }) => <SubFiltersModule row={row} />}
			/>
		</MainLayout>
	);
}
