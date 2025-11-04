import React, { useMemo } from "react";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import Table from "@/components/core/Table/Table";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/ServiceDomainType";

type ServicesByServiceDomainModuleType = { row: MRT_Row<ServiceDomainsResponse> };

export default function ServicesByServiceDomainModule({
	row,
}: ServicesByServiceDomainModuleType) {
	const {
		data: services,
		isLoading,
		onCreatingRowSave,
		pagination,
		setPagination,
		onEditingRowSave,
		onDeletingRowSave,
	} = useTableHandlers<ServiceType>({
		route: "nomenclatures/service-domains/services",
		extraParams: { id: row.original.id },
	});

	const columns = useMemo<MRT_ColumnDef<ServiceType>[]>(
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
		<Table<ServiceType>
			data={services?.results}
			rowCount={services?.count}
			columns={columns}
			manualPagination={true}
			enableColumnFilters={false}
			enableSorting={false}
			topToolbarIconButton
			enableFilters={false}
			onPaginationChange={setPagination}
			onCreatingRowSave={onCreatingRowSave}
			onEditingRowSave={onEditingRowSave}
			onDeletingRowSave={onDeletingRowSave}
			state={{ pagination, isLoading }}
			muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
		/>
	);
}
