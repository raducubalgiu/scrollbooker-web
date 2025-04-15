"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import {
	filtersColumns,
	subFiltersColumns,
} from "./filtersAndSubFiltersColumns";
import useFilterHandlers from "./useFilterHandlers";

export default function FiltersModule() {
	const {
		data,
		pagination,
		setPagination,
		isLoading,
		onFilterCreatingRowSave,
		onFilterDeletingRowSave,
		onFilterEditingRowSave,
	} = useFilterHandlers();

	return (
		<MainLayout title="Filtre" hideAction>
			<Table
				data={data?.results}
				rowCount={data?.count}
				columns={filtersColumns}
				manualPagination
				onDeletingRowSave={onFilterDeletingRowSave}
				onCreatingRowSave={onFilterCreatingRowSave}
				onEditingRowSave={onFilterEditingRowSave}
				onPaginationChange={setPagination}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) => (
					<Table
						data={row.original.sub_filters}
						columns={subFiltersColumns}
						manualPagination={false}
						onDeletingRowSave={() => {}}
						enableColumnFilters={false}
						enableSorting={false}
						topToolbarIconButton
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
