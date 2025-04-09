/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	MRT_PaginationState,
	MRT_Updater,
} from "material-react-table";
import MaterialExpandableComponent from "../../../core/Table/MaterialExpandableComponent";
import { Box, Typography } from "@mui/material";
import {
	BusinessType,
	PaginatedBusinessType,
} from "../../../../models/nomenclatures/BusinessType";
import { ServiceType } from "../../../../models/nomenclatures/ServiceType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery } from "@/hooks/useHttp";

export default function BusinessTypesModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedBusinessType>({
		key: ["business-types", pagination.pageIndex, pagination.pageSize],
		url: `/api/business-types`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns = useMemo<MRT_ColumnDef<BusinessType>[]>(
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
				accessorKey: "business_domain_id",
				header: "Business Domain Id",
			},
			{
				accessorKey: "created_at",
				header: "Created At",
			},
		],
		[]
	);

	const services_columns = useMemo<MRT_ColumnDef<ServiceType[]>[]>(
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
		],
		[]
	);

	const handlePagination = (updater: MRT_Updater<any>) => {
		const newState = updater(pagination);
		setPagination(newState);
	};

	return (
		<MainLayout title="Business Types">
			<MaterialReactTable
				data={data?.results ? data?.results : []}
				columns={columns}
				paginateExpandedRows={false}
				manualPagination={true}
				onPaginationChange={handlePagination}
				rowCount={data?.count}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) => (
					<>
						<Box>
							<Typography sx={{ fontWeight: "600", mb: 1 }}>
								Services
							</Typography>
							<MaterialExpandableComponent
								data={row.original.services}
								columns={services_columns}
							/>
						</Box>
						<Box>
							<Typography sx={{ fontWeight: "600", my: 1 }}>Filters</Typography>
							<MaterialExpandableComponent
								data={row.original.filters}
								columns={services_columns}
								renderDetailPanel={({ row }: { row: any }) => (
									<MaterialExpandableComponent
										data={row.original.sub_filters}
										columns={services_columns}
									/>
								)}
							/>
						</Box>
					</>
				)}
			/>
		</MainLayout>
	);
}
