"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { servicesColumns } from "./servicesColumns";
import useServiceHandlers from "./useServiceHandlers";

export default function ServicesModule() {
	const {
		data,
		pagination,
		setPagination,
		isLoading,
		onCreatingRowSave,
		onEditingRowSave,
		onDeletingRowSave,
	} = useServiceHandlers();

	return (
		<MainLayout title="Services" hideAction>
			<Table
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
