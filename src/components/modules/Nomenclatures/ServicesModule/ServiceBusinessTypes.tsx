import Table from "@/components/core/Table/Table";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import ServiceBusinessTypeCheckbox from "./ServiceBusinessTypeCheckbox";

type ServiceBusinessTypesProps = {
	serviceId: number | undefined;
	serviceName: string;
	businessDomainId: number;
};

export default function ServiceBusinessTypes({
	serviceId,
	serviceName,
	businessDomainId,
}: ServiceBusinessTypesProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessType>({
		route: "nomenclatures/business-domains/business-types",
		extraParams: { id: businessDomainId },
	});

	const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
				enableEditing: false,
			},
			{
				accessorKey: "relation",
				header: "Atasat",
				Cell: ({ row }) => (
					<ServiceBusinessTypeCheckbox
						row={row}
						serviceId={serviceId}
						serviceName={serviceName}
					/>
				),
			},
		],
		[serviceId, serviceName]
	);

	return (
		<Table<BusinessType>
			data={data?.results}
			rowCount={data?.count}
			columns={columns}
			onCreatingRowSave={onCreatingRowSave}
			onEditingRowSave={onEditingRowSave}
			onDeletingRowSave={onDeletingRowSave}
			manualPagination={true}
			onPaginationChange={setPagination}
			enableTopToolbar={false}
			enableEditing={false}
			state={{ pagination, isLoading }}
			muiTableHeadCellProps={{
				sx: {
					bgcolor: "surface.main",
					color: "neutral.100",
				},
			}}
		/>
	);
}
