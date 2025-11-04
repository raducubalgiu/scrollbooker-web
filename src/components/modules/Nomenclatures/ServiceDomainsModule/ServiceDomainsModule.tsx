"use client";

import Table from "@/components/core/Table/Table";
import { ServiceDomainsResponse } from "../../../../ts/models/nomenclatures/ServiceDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import ServicesByServiceDomainModule from "./ServicesByServiceDomainModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";

type ServiceDomainsModuleProps = { businessDomains: BusinessDomainType[] }

export default function ServiceDomainsModule({ businessDomains }: ServiceDomainsModuleProps) {
	const {
		data,
		isLoading,
		onCreatingRowSave,
		pagination,
		setPagination,
		onEditingRowSave,
		onDeletingRowSave,
	} = useTableHandlers<ServiceDomainsResponse>({
		route: "nomenclatures/service-domains",
	});

	const serviceDomainsColumns = useMemo<MRT_ColumnDef<ServiceDomainsResponse>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
				enableEditing: false,
			},
			{
				accessorKey: "name",
				header: "Name",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={100}
					/>
				),
			},
			{
				accessorKey: "business_domain_id",
				header: "Domeniu Business",
				Edit: ({ row, column, cell }) => (
					<MR_Select
						row={row}
						column={column}
						value={Number(cell.getValue()) ?? ""}
						options={businessDomains.map(bd => {
							return {
								value: bd.id,
								name: bd.name,
							};
						})}
					/>
				),
				Cell: ({ cell }) =>
					businessDomains?.find(bd => bd.id === cell.getValue())?.name,
			},
		],
		[businessDomains]
	);

	return (
		<MainLayout title="Service Domains" hideAction>
			<Table<ServiceDomainsResponse>
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
					<ServicesByServiceDomainModule row={row} />
				)}
			/>
		</MainLayout>
	);
}
