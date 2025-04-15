import React from "react";
import Table from "@/components/core/Table/Table";
import { SubFilterType } from "@/models/nomenclatures/SubFilterType";
import { subFiltersColumns } from "./filtersAndSubFiltersColumns";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_Row } from "material-react-table";
import { FilterType } from "@/models/nomenclatures/FilterType";

export default function SubFiltersTable({ row }: { row: MRT_Row<FilterType> }) {
	const {
		data: subFilters,
		isLoading: isLoadingSubFilters,
		pagination: subFiltersPagination,
		setPagination: setSubFiltersPagination,
		onCreatingRowSave: onSubFilterCreatingRowSave,
		onDeletingRowSave: onSubFilterDeletingRowSave,
		onEditingRowSave: onSubFilterEditingRowSave,
	} = useTableHandlers<SubFilterType>({
		route: "nomenclatures/sub-filters",
		extraParams: { id: row.original.id },
	});

	return (
		<Table<SubFilterType>
			data={subFilters?.results}
			rowCount={subFilters?.count}
			columns={subFiltersColumns}
			manualPagination={true}
			enableColumnFilters={false}
			enableSorting={false}
			topToolbarIconButton
			onPaginationChange={setSubFiltersPagination}
			onCreatingRowSave={onSubFilterCreatingRowSave}
			onEditingRowSave={onSubFilterEditingRowSave}
			onDeletingRowSave={onSubFilterDeletingRowSave}
			state={{
				pagination: subFiltersPagination,
				isLoading: isLoadingSubFilters,
			}}
			muiTableHeadCellProps={{
				sx: {
					bgcolor: "surface.main",
					color: "neutral.100",
				},
			}}
		/>
	);
}
