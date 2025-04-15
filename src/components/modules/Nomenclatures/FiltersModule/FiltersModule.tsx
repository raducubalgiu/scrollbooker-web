"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { filtersColumns } from "./columns";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { FilterType } from "@/models/nomenclatures/FilterType";
import SubFiltersTable from "./SubFiltersTable";

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

	return (
		<MainLayout title="Filtre" hideAction>
			<Table<FilterType>
				data={filters?.results}
				rowCount={filters?.count}
				columns={filtersColumns}
				manualPagination
				onDeletingRowSave={onFilterDeletingRowSave}
				onCreatingRowSave={onFilterCreatingRowSave}
				onEditingRowSave={onFilterEditingRowSave}
				onPaginationChange={setFiltersPagination}
				state={{ pagination: filtersPagination, isLoading: isLoadingFilters }}
				renderDetailPanel={({ row }) => <SubFiltersTable row={row} />}
			/>
		</MainLayout>
	);
}
