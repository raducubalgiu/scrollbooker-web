"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import { businessDomainsColumns } from "./business-domains-columns";
import useTableHandlers from "@/components/core/Table/useTableHandlers";

export default function BusinessDomainsModule() {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessDomainType>({
		route: "nomenclatures/business-domains",
	});

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
