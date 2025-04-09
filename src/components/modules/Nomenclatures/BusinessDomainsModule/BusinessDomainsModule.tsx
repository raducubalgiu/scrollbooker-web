/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useMemo } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";
import MainLayout from "../../../cutomized/MainLayout/MainLayout";
import { useCustomQuery } from "@/hooks/useHttp";
import { Stack, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function BusinessDomainsModule() {
	const { data, isLoading } = useCustomQuery<BusinessDomainType[]>({
		key: ["business-domains"],
		url: `/api/business-domains`,
	});

	const columns = useMemo<MRT_ColumnDef<BusinessDomainType>[]>(
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
				size: 300,
			},
			{
				accessorKey: "created_at",
				header: "Created_at",
				enableEditing: false,
			},
			{
				accessorKey: "updated_at",
				header: "updated_at",
				enableEditing: false,
			},
		],
		[]
	);

	return (
		<MainLayout title="Business Domains" hideAction>
			<MaterialReactTable
				data={data ? data : []}
				columns={columns}
				manualPagination={true}
				editDisplayMode="row"
				enableEditing={true}
				positionCreatingRow="bottom"
				state={{
					isLoading,
					columnPinning: { right: ["mrt-row-actions"] },
				}}
				enableRowActions={true}
				renderRowActions={({ row, table }) => (
					<Stack direction="row">
						<IconButton onClick={() => table.setEditingRow(row)}>
							<Edit />
						</IconButton>
						<IconButton onClick={() => {}} color="secondary">
							<RemoveCircleOutlineIcon />
						</IconButton>
					</Stack>
				)}
				// renderTopToolbar={({ table }) => {
				// 	return (
				// 		<Button variant="contained" onClick={() => {}}>
				// 			Add New Row
				// 		</Button>
				// 	);
				// }}
			/>
		</MainLayout>
	);
}
