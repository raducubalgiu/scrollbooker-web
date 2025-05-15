import useTableHandlers from "@/components/core/Table/useTableHandlers";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { MRT_ColumnDef } from "material-react-table";
import React from "react";
import Table from "@/components/core/Table/Table";

type BusinessTypeServicesModuleProps = { businessTypeId: number | undefined };

export default function BusinessTypeServicesModule({
	businessTypeId,
}: BusinessTypeServicesModuleProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onDeletingRowSave,
		onCreatingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ServiceType>({
		route: "nomenclatures/business-types/services",
		extraParams: { businessTypeId },
	});

	const columns: MRT_ColumnDef<ServiceType>[] = [
		{
			accessorKey: "id",
			header: "ID",
			size: 50,
			enableEditing: false,
		},
		{
			accessorKey: "name",
			header: "Name",
		},
	];

	return (
		<MainLayout title="Servicii" hideAction>
			<Table<ServiceType>
				data={data}
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
				muiTableHeadCellProps={{
					sx: {
						bgcolor: "surface.main",
						color: "neutral.100",
					},
				}}
			/>
		</MainLayout>
	);
}
