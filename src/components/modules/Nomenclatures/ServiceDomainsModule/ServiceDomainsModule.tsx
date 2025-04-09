/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	MRT_PaginationState,
	MRT_Updater,
} from "material-react-table";
import {
	PaginatedServiceDomainsType,
	ServiceDomainsType,
} from "../../../../models/nomenclatures/ServiceDomain";
import MaterialExpandableComponent from "../../../core/Table/MaterialExpandableComponent";
import { ServiceType } from "../../../../models/nomenclatures/ServiceType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery } from "@/hooks/useHttp";

export default function ServiceDomainsModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedServiceDomainsType>({
		key: ["service-domains", pagination.pageIndex, pagination.pageSize],
		url: `/api/service-domains`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns = useMemo<MRT_ColumnDef<ServiceDomainsType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
			},
			{
				accessorKey: "name",
				header: "Name",
				size: 300,
			},
			{
				accessorKey: "created_at",
				header: "Created_at",
				muiTableHeadCellProps: { align: "right" },
				muiTableBodyCellProps: { align: "right" },
			},
			{
				accessorKey: "updated_at",
				header: "updated_at",
				muiTableHeadCellProps: { align: "right" },
				muiTableBodyCellProps: { align: "right" },
			},
		],
		[]
	);

	const serviceColumns = useMemo<MRT_ColumnDef<ServiceType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
			},
			{
				accessorKey: "name",
				header: "Name",
				size: 300,
			},
		],
		[]
	);

	const handlePagination = (updater: MRT_Updater<any>) => {
		const newState = updater(pagination);
		setPagination(newState);
	};

	return (
		<MainLayout title="Service Domains">
			<MaterialReactTable
				data={data?.results ? data?.results : []}
				columns={columns}
				manualPagination={true}
				onPaginationChange={handlePagination}
				rowCount={data?.count}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) => (
					<MaterialExpandableComponent
						data={row.original.services}
						columns={serviceColumns}
					/>
				)}
			/>
		</MainLayout>
	);
}
