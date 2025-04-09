import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { Skeleton } from "@mui/material";

type TableSkeletonProps = { columns: number; rows?: number };

export default function TableSkeleton({
	columns,
	rows = 10,
}: TableSkeletonProps) {
	const rowsCount = Array.from({ length: rows });
	const cellsCount = Array.from({ length: columns });

	return (
		<>
			{rowsCount.map((row, i) => (
				<TableRow key={i}>
					{cellsCount.map((_, cellIndex) => (
						<TableCell key={cellIndex}>
							<Skeleton />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}
