import React, { useMemo } from "react";
import Table from "@/components/core/Table/Table";
import { SubFilterType } from "@/ts/models/nomenclatures/SubFilterType";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";

export default function SubFiltersModule({
	row,
}: {
	row: MRT_Row<FilterType>;
}) {
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

	const subFiltersColumns = useMemo<MRT_ColumnDef<SubFilterType>[]>(
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
						maxLength={50}
					/>
				),
			},
		],
		[]
	);

	return (
		<Table<SubFilterType>
			data={subFilters?.results}
			rowCount={subFilters?.count}
			columns={subFiltersColumns}
			manualPagination={true}
			enableColumnFilters={false}
			enableSorting={false}
			topToolbarIconButton
			enableFilters={false}
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
