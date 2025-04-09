/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState } from "react";
import NomenclatureLayout from "../../cutomized/MainLayout/MainLayout";
import {
	MaterialReactTable,
	MRT_PaginationState,
	type MRT_ColumnDef,
	MRT_Updater,
} from "material-react-table";
import { useCustomQuery } from "@/hooks/useHttp";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

type EmployeeType = {
	username: string;
	job: string;
	hire_date: string;
	followers_count: number;
	ratings_count: number;
	ratings_average: number;
};

type PaginatedEmployeesType = {
	count: number;
	results: EmployeeType[];
};

export default function EmployeesModule() {
	const [pagination, setPagination] = useState<MRT_PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedEmployeesType>({
		key: ["employees"],
		url: `/api/employees`,
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns = useMemo<MRT_ColumnDef<EmployeeType>[]>(
		() => [
			{
				accessorKey: "username",
				header: "Username",
			},
			{
				accessorKey: "job",
				header: "Job",
			},
			{
				accessorKey: "ratings_average",
				header: "Rating",
				Cell: ({ renderedCellValue }) => (
					<CustomStack justifyContent="flex-start">
						<StarIcon color="primary" />
						<Typography sx={{ fontWeight: "600", ml: 1 }}>
							{renderedCellValue}
						</Typography>
					</CustomStack>
				),
			},
			{
				accessorKey: "ratings_count",
				header: "Ratings Count",
			},
			{
				accessorKey: "followers_count",
				header: "Followers",
			},
			{
				accessorKey: "hire_date",
				header: "Hire Date",
			},
		],
		[]
	);

	const handlePagination = (updater: MRT_Updater<any>) => {
		const newState = updater(pagination);
		setPagination(newState);
	};

	return (
		<NomenclatureLayout hideAction title="Employees">
			<MaterialReactTable
				data={data?.results ? data?.results : []}
				columns={columns}
				manualPagination={true}
				onPaginationChange={handlePagination}
				rowCount={data?.count}
				state={{ pagination, isLoading }}
			/>
		</NomenclatureLayout>
	);
}
