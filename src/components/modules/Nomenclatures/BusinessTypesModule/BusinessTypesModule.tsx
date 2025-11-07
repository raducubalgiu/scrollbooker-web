"use client";

import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import Table from "@/components/core/Table/Table";
import { BusinessType } from "@/ts/models/nomenclatures/BusinessType";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import BusinessTypeServicesModule from "./BusinessTypeServicesModule";

type BusinessTypesModuleProps = { businessDomains: BusinessDomainType[] };

export default function BusinessTypesModule({
	businessDomains,
}: BusinessTypesModuleProps) {
	const {
		data,
		isLoading,
		pagination,
		setPagination,
		onDeletingRowSave,
		onCreatingRowSave,
		onEditingRowSave,
	} = useTableHandlers<BusinessType>({ route: "nomenclatures/business-types" });

	const businessTypeColumns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
						value={row.getValue(column.id)}
						required
						minLength={3}
						maxLength={100}
					/>
				),
			},
			{
				accessorKey: "plural",
				header: "Plural",
				Edit: ({ row, column }) => (
					<MR_Input
						row={row}
						column={column}
						value={row.getValue(column.id)}
						required
						minLength={3}
						maxLength={50}
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
			{
				accessorKey: "created_at",
				header: "Created At",
				enableEditing: false,
			},
		],
		[businessDomains]
	);

	// const filtersColumns = useMemo<MRT_ColumnDef<FilterType>[]>(
	// 	() => [
	// 		{
	// 			accessorKey: "id",
	// 			header: "ID",
	// 			size: 50,
	// 			enableEditing: false,
	// 		},
	// 		{
	// 			accessorKey: "name",
	// 			header: "Name",
	// 		},
	// 		{
	// 			accessorKey: "created_at",
	// 			header: "Created_at",
	// 			enableEditing: false,
	// 		},
	// 		{
	// 			accessorKey: "updated_at",
	// 			header: "Updated_at",
	// 			enableEditing: false,
	// 		},
	// 	],
	// 	[]
	// );

	// const subFiltersColumns = useMemo<MRT_ColumnDef<SubFilterType>[]>(
	// 	() => [
	// 		{
	// 			accessorKey: "id",
	// 			header: "ID",
	// 			size: 50,
	// 			enableEditing: false,
	// 		},
	// 		{
	// 			accessorKey: "name",
	// 			header: "Name",
	// 			size: 300,
	// 		},
	// 	],
	// 	[]
	// );

	return (
		<MainLayout title="Tip Business" hideAction>
			<Table<BusinessType>
				data={data?.results}
				rowCount={data?.count}
				columns={businessTypeColumns}
				manualPagination
				onPaginationChange={setPagination}
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) =>
					<BusinessTypeServicesModule businessTypeId={row.original.id} />
				}
			/>
		</MainLayout>
	);
}
