"use client";

import Table from "@/components/core/Table/Table";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import MR_Input from "@/components/core/Table/MR_Inputs/MR_Input";
import { ProfessionType } from "@/models/ProfessionType";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import MR_Select from "@/components/core/Table/MR_Inputs/MR_Select";
import ProfessionBusinessTypes from "./ProfessionBusinessTypes";

type ProfessionsModuleProps = { businessDomains: BusinessDomainType[] };

export default function ProfessionsModule({
	businessDomains,
}: ProfessionsModuleProps) {
	const {
		data,
		isLoading,
		onCreatingRowSave,
		pagination,
		setPagination,
		onEditingRowSave,
		onDeletingRowSave,
	} = useTableHandlers<ProfessionType>({
		route: "nomenclatures/professions",
	});

	const columns = useMemo<MRT_ColumnDef<ProfessionType>[]>(
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
				header: "Created_at",
				enableEditing: false,
			},
		],
		[businessDomains]
	);

	return (
		<MainLayout title="Profesii" hideAction>
			<Table<ProfessionType>
				data={data?.results}
				rowCount={data?.count}
				columns={columns}
				manualPagination
				onCreatingRowSave={onCreatingRowSave}
				onEditingRowSave={onEditingRowSave}
				onDeletingRowSave={onDeletingRowSave}
				onPaginationChange={setPagination}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) =>
					row.original.id && (
						<ProfessionBusinessTypes
							professionId={row.original.id}
							professionName={row.original.name}
							businessDomainId={row.original.business_domain_id}
						/>
					)
				}
			/>
		</MainLayout>
	);
}
