"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import { businessDomainsColumns } from "./business-domains-columns";
import useBusinessDomainsHandlers from "./useBusinessDomainsHandlers";

export default function BusinessDomainsModule() {
	const {
		data,
		pagination,
		setPagination,
		isLoading,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useBusinessDomainsHandlers();

	return (
		<MainLayout title="Business Domains" hideAction>
			<Table<BusinessDomainType>
				data={data?.results}
				rowCount={data?.count}
				columns={businessDomainsColumns}
				onDeletingRowSave={onDeletingRowSave}
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				state={{ pagination, isLoading }}
			/>
		</MainLayout>
	);
}
