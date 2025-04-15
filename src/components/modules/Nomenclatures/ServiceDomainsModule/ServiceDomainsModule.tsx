"use client";

import Table from "@/components/core/Table/Table";
import { ServiceDomainsType } from "../../../../models/nomenclatures/ServiceDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { serviceDomainsColumns, serviceColumns } from "./serviceDomainsColumns";
import useServiceDomainsHandlers from "./useServiceDomainsHandlers";

export default function ServiceDomainsModule() {
	const {
		data,
		pagination,
		setPagination,
		isLoading,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useServiceDomainsHandlers();

	return (
		<MainLayout title="Service Domains" hideAction>
			<Table<ServiceDomainsType>
				data={data?.results}
				rowCount={data?.count}
				columns={serviceDomainsColumns}
				manualPagination
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				onPaginationChange={setPagination}
				renderDetailPanel={({ row }) => (
					<Table
						data={row.original.services}
						columns={serviceColumns}
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
		</MainLayout>
	);
}
