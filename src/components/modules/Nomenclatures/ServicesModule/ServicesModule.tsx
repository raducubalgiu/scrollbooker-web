"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { servicesColumns } from "./columns";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { ServiceType } from "@/models/nomenclatures/ServiceType";

export default function ServicesModule() {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ServiceType>({ route: "nomenclatures/services" });

	return (
		<MainLayout title="Services" hideAction>
			<Table<ServiceType>
				data={data?.results}
				rowCount={data?.count}
				columns={servicesColumns}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				manualPagination={true}
				onPaginationChange={setPagination}
				state={{ pagination, isLoading }}
			/>
		</MainLayout>
	);
}
