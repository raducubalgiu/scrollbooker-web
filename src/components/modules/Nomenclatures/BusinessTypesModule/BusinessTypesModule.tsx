"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { BusinessType } from "@/models/nomenclatures/BusinessType";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { businessTypeColumns, businessTypeServicesColumns } from "./columns";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { SubFilterType } from "@/models/nomenclatures/SubFilterType";
import { FilterType } from "@/models/nomenclatures/FilterType";
import { filtersColumns, subFiltersColumns } from "../FiltersModule/columns";

export default function BusinessTypesModule() {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onDeletingRowSave,
		onCreatingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessType>({ route: "nomenclatures/business-types" });

	return (
		<MainLayout title="Business Types" hideAction>
			<Table<BusinessType>
				data={data?.results}
				rowCount={data?.count}
				columns={businessTypeColumns}
				manualPagination
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) => (
					<>
						<Table<ServiceType>
							data={row.original.services}
							manualPagination={false}
							columns={businessTypeServicesColumns}
							enableEditing={false}
							enableTopToolbar={false}
							muiTableHeadCellProps={{
								sx: {
									bgcolor: "surface.main",
									color: "neutral.100",
								},
							}}
						/>
						<Table<FilterType>
							data={row.original.filters}
							manualPagination={false}
							columns={filtersColumns}
							enableEditing={false}
							enableTopToolbar={false}
							muiTableHeadCellProps={{
								sx: {
									bgcolor: "surface.main",
									color: "neutral.100",
								},
							}}
							renderDetailPanel={({ row }) => (
								<Table<SubFilterType>
									data={row.original.sub_filters}
									columns={subFiltersColumns}
									manualPagination={false}
									enableEditing={false}
									enableTopToolbar={false}
									muiTableHeadCellProps={{
										sx: {
											bgcolor: "surface.main",
											color: "neutral.100",
										},
									}}
								/>
							)}
						/>
					</>
				)}
			/>
		</MainLayout>
	);
}
