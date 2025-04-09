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
	FilterType,
	PaginatedFilterType,
} from "../../../../models/nomenclatures/FilterType";
import { SubFilterType } from "../../../../models/nomenclatures/SubFilterType";
import MaterialExpandableComponent from "../../../core/Table/MaterialExpandableComponent";
import { Box, IconButton, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { useCustomQuery } from "@/hooks/useHttp";

export default function FiltersModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedFilterType>({
		key: ["filters"],
		url: `/api/filters`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns = useMemo<MRT_ColumnDef<FilterType>[]>(
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
				header: "Updated_at",
			},
		],
		[]
	);

	const subFiltersColumns = useMemo<MRT_ColumnDef<SubFilterType>[]>(
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
		<MainLayout title="Filters">
			<MaterialReactTable
				data={data?.results ? data?.results : []}
				columns={columns}
				manualPagination={true}
				onPaginationChange={handlePagination}
				rowCount={data?.count}
				state={{ pagination, isLoading }}
				renderDetailPanel={({ row }) => (
					<Box>
						<CustomStack sx={{ mb: 1.5 }}>
							<Typography sx={{ fontWeight: "600" }}>Subfilters</Typography>
							<IconButton color="primary">
								<AddBoxIcon />
							</IconButton>
						</CustomStack>
						<MaterialExpandableComponent
							data={row.original.sub_filters}
							columns={subFiltersColumns}
						/>
					</Box>
				)}
			/>
		</MainLayout>
	);
}
