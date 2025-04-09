"use client";

import { MaterialReactTable } from "material-react-table";
import React from "react";

export default function MaterialExpandableComponent({
	columns,
	data,
	...props
}) {
	return (
		<MaterialReactTable
			data={data}
			columns={columns}
			enableExpandAll={false}
			enableExpanding={false}
			filterFromLeafRows={true}
			enableTopToolbar={false}
			enableBottomToolbar={false}
			enableColumnActions={false}
			enableColumnFilters={false}
			enableClickToCopy={false}
			enablePagination={false}
			enableSorting={false}
			initialState={{
				expanded: true,
				pagination: { pageIndex: 0, pageSize: 5 },
				density: "compact",
			}}
			paginateExpandedRows={false}
			muiTableHeadCellProps={{
				sx: {
					backgroundColor: "surface.main",
					color: "neutral.100",
				},
			}}
			{...props}
		/>
	);
}
