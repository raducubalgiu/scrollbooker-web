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
	PaginatedServiceType,
	ServiceType,
} from "../../../../models/nomenclatures/ServiceType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery } from "@/hooks/useHttp";

export default function ServicesModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedServiceType>({
		key: ["services", pagination.pageIndex, pagination.pageSize],
		url: `/api/services`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns = useMemo<MRT_ColumnDef<ServiceType>[]>(
		() => [
			{
				accessorKey: "id",
				header: "ID",
				size: 50,
			},
			{
				accessorKey: "name",
				header: "Name",
			},
			{
				accessorKey: "created_at",
				header: "Created_at",
			},
			{
				accessorKey: "updated_at",
				header: "updated_at",
			},
		],
		[]
	);

	const handlePagination = (updater: MRT_Updater<any>) => {
		const newState = updater(pagination);
		setPagination(newState);
	};

	return (
		<MainLayout title="Services">
			<MaterialReactTable
				data={data?.results ? data?.results : []}
				columns={columns}
				manualPagination={true}
				onPaginationChange={handlePagination}
				rowCount={data?.count}
				state={{ pagination, isLoading }}
			/>
		</MainLayout>
	);
}
