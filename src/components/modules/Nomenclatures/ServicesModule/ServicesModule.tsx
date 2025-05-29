"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import ServiceBusinessTypes from "./ServiceBusinessTypes";

type ServicesModuleProps = {
	businessDomains: BusinessDomainType[];
};

export default function ServicesModule({
	businessDomains,
}: ServicesModuleProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onCreatingRowSave,
		onDeletingRowSave,
		onEditingRowSave,
	} = useTableHandlers<ServiceType>({ route: "nomenclatures/services" });

	const servicesColumns = useMemo<MRT_ColumnDef<ServiceType>[]>(
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
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.original.name}
						required
						minLength={3}
						maxLength={50}
					/>
				),
			},
			{
				accessorKey: "keywords",
				header: "Keywords",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						value={row.original.keywords}
						required
					/>
				),
			},
			{
				accessorKey: "business_domain_id",
				header: "Business Domain Id",
				Edit: ({ row, column, cell }) => (
					<MR_Select
						row={row}
						column={column}
						value={Number(cell.getValue()) ?? ""}
						options={businessDomains?.map(bd => {
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
			{
				accessorKey: "created_at",
				enableEditing: false,
				header: "Created_at",
			},
		],
		[businessDomains]
	);

	return (
		<MainLayout title="Servicii" hideAction>
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
				renderDetailPanel={({ row }) =>
					!!row.original.id && (
						<ServiceBusinessTypes
							serviceId={row.original.id}
							serviceName={row.original.name}
							businessDomainId={row.original.business_domain_id}
						/>
					)
				}
			/>
		</MainLayout>
	);
}
