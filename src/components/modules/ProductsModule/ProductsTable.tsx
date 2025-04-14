"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import { ProductType } from "@/models/Product/ProductResponse";
import Table, {
	PaginatedData,
	TableCreateRow,
	TableEditRow,
	TableRowAndTable,
} from "@/components/core/Table/Table";
import { useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { MenuItem } from "@mui/material";

export default function ProductsTable() {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const { data, isLoading } = useCustomQuery<PaginatedData<ProductType>>({
		key: ["products", pagination.pageIndex, pagination.pageSize],
		url: "/api/products",
		params: { page: pagination.pageIndex + 1, limit: pagination.pageSize },
	});

	const columns: MRT_ColumnDef<ProductType>[] = [
		{ accessorKey: "name", header: "Name" },
		{ accessorKey: "description", header: "Description" },
		{
			accessorKey: "duration",
			header: "Duration",
			muiEditTextFieldProps: {
				select: true,
				children: [
					<MenuItem key="active" defaultValue="active">
						Active
					</MenuItem>,
					<MenuItem key="inactive" defaultValue="inactive">
						Inactive
					</MenuItem>,
				],
			},
		},
		{ accessorKey: "price", header: "Price" },
		{ accessorKey: "discount", header: "Discount" },
	];

	const handleCreate: TableCreateRow<ProductType> = async ({
		values,
		table,
	}) => {
		console.log("ROW!!!", values);
		console.log("TABLE!!!!", table);
	};

	const handleEdit: TableEditRow<ProductType> = async ({ values, table }) => {
		console.log("ROW!!!", values);
		console.log("TABLE!!!!", table);
	};

	const onDeletingRowSave = ({ row, table }: TableRowAndTable<ProductType>) => {
		console.log("ROW!!!", row);
		console.log("TABLE!!!", table);
	};

	return (
		<Table<ProductType>
			data={data?.results}
			rowCount={data?.count}
			columns={columns}
			manualPagination={true}
			onDeletingRowSave={onDeletingRowSave}
			onEditingRowSave={handleEdit}
			onCreatingRowSave={handleCreate}
			onPaginationChange={setPagination}
			state={{ pagination, isLoading }}
		/>
	);
}
