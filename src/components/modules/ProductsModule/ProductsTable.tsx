"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import React, { useMemo, useState } from "react";
import { PaginatedProductType } from "@/models/Product/ProductResponse";
import CustomTable, {
	CustomTableColumnType,
} from "@/components/core/CustomTable/CustomTable";

export default function ProductsTable() {
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(10);

	const { data, isLoading } = useCustomQuery<PaginatedProductType>({
		key: ["products", page, limit],
		url: "/api/products",
		params: { page: page + 1, limit },
	});

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLimit(parseInt(event.target.value, 10));
		setPage(1);
	};

	const columns: CustomTableColumnType[] = useMemo(
		() => [
			{
				title: "Name",
				accessoryKey: "name",
			},
			{
				title: "Description",
				accessoryKey: "description",
			},
			{
				title: "Duration",
				accessoryKey: "duration",
			},
			{
				title: "Price",
				accessoryKey: "price",
			},
			{
				title: "Discount",
				accessoryKey: "discount",
			},
		],
		[]
	);

	return (
		<CustomTable
			columns={columns}
			data={data?.results ? data?.results : []}
			isLoading={isLoading}
			enablePagination={true}
			onHandleChangePage={handleChangePage}
			onHandleChangeLimit={handleChangeLimit}
			initialState={{
				pagination: { page, limit, count: data?.count },
			}}
		/>
	);
}
