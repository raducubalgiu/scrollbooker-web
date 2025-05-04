"use client";

import React, { useMemo } from "react";
import NomenclatureLayout from "../../cutomized/MainLayout/MainLayout";
import { type MRT_ColumnDef } from "material-react-table";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import useTableHandlers from "@/components/core/Table/useTableHandlers";
import Table from "@/components/core/Table/Table";

type EmployeeType = {
	username: string;
	job: string;
	hire_date: string;
	followers_count: number;
	ratings_count: number;
	ratings_average: number;
};

export default function EmployeesModule() {
	const { data, pagination, isLoading, setPagination } =
		useTableHandlers<EmployeeType>({ route: "employees" });

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
				Cell: ({ row }) => (
					<CustomStack justifyContent="flex-start">
						<StarIcon color="primary" />
						<Typography sx={{ fontWeight: "600", ml: 1 }}>
							{row.original.ratings_average}
						</Typography>
					</CustomStack>
				),
			},
			{
				accessorKey: "ratings_count",
				header: "Număr Recenzii",
			},
			{
				accessorKey: "followers_count",
				header: "Urmăritori",
			},
			{
				accessorKey: "hire_date",
				header: "Data angajării",
			},
		],
		[]
	);

	return (
		<NomenclatureLayout hideAction title="Employees">
			<Table<EmployeeType>
				data={data?.results}
				columns={columns}
				manualPagination={true}
				onPaginationChange={setPagination}
				state={{ pagination, isLoading }}
				enableEditing={false}
				enableFilters={false}
				renderTopToolbarCustomActions={undefined}
			/>
		</NomenclatureLayout>
	);
}
