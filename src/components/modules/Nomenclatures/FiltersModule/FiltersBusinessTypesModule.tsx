import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import React, { useMemo } from "react";
import FilterBusinessTypeCheckbox from "./FilterBusinessTypeCheckbox";

type FiltersBusinessTypesModuleProps = {
	filterRow: MRT_Row<FilterType>;
};

export default function FiltersBusinessTypesModule({
	filterRow,
}: FiltersBusinessTypesModuleProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessType>({ route: "nomenclatures/business-types" });

	const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
				enableEditing: false,
			},
			{
				accessorKey: "relation",
				header: "Atasat",
				Cell: ({ row }) => (
					<FilterBusinessTypeCheckbox
						filterRow={filterRow}
						businessTypeRow={row}
					/>
				),
			},
		],
		[filterRow]
	);
	return (
		<MainLayout title="Filters - Business Types" hideAction sx={{ mt: 2.5 }}>
			<Table<BusinessType>
				data={data?.results}
				rowCount={data?.count}
				columns={columns}
				manualPagination
				enableEditing={false}
				renderTopToolbar={false}
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
			/>
		</MainLayout>
	);
}
