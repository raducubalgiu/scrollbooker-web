"use client";

import { useMemo } from "react";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	MRT_ActionMenuItem,
	MRT_TableOptions,
	useMaterialReactTable,
	MRT_Row,
	MRT_TableInstance,
	MRT_RowData,
} from "material-react-table";
import { Button } from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

export type TableCreateRow<T extends MRT_RowData> =
	MRT_TableOptions<T>["onCreatingRowSave"];
export type TableEditRow<T extends MRT_RowData> =
	MRT_TableOptions<T>["onEditingRowSave"];

export type PaginatedData<T> = {
	count: number;
	results: T[];
};
export type TableRowAndTable<T extends Record<string, unknown>> = {
	row: MRT_Row<T>;
	table: MRT_TableInstance<T>;
};

type TableProps<T extends Record<string, unknown>> = {
	manualPagination?: boolean;
	data: T[] | undefined;
	columns: MRT_ColumnDef<T>[];
	onDeletingRowSave: ({
		row,
		table,
	}: TableRowAndTable<T>) => Promise<void> | void;
	showProgressBars?: boolean;
} & Partial<MRT_TableOptions<T>>;

export default function Table<T extends Record<string, unknown>>({
	data,
	columns,
	manualPagination = false,
	onDeletingRowSave,
	...props
}: TableProps<T>) {
	const tableColumns = useMemo<MRT_ColumnDef<T>[]>(
		() => [...columns],
		[columns]
	);

	const renderRowActionMenuItems = ({ row, table }: TableRowAndTable<T>) => [
		<MRT_ActionMenuItem
			key={2}
			label="Șterge"
			icon={<Delete />}
			onClick={() => onDeletingRowSave({ row, table })}
			table={table}
		/>,
	];

	const renderTopToolbarCustomActions = ({
		table,
	}: {
		table: MRT_TableInstance<T>;
	}) => (
		<Button onClick={() => table.setCreatingRow(true)} variant="contained">
			Adaugă
		</Button>
	);

	const icons = {
		SaveIcon: () => <Check color="success" />,
		CancelIcon: () => <CloseIcon color="error" />,
	};

	const table = useMaterialReactTable({
		columns: tableColumns,
		data: data ?? [],
		manualPagination,
		enableEditing: true,
		editDisplayMode: "row",
		createDisplayMode: "row",
		getRowId: row => String(row.id),
		positionActionsColumn: "last",
		renderRowActionMenuItems,
		renderTopToolbarCustomActions,
		muiEditTextFieldProps: { variant: "outlined" },
		muiLinearProgressProps: ({ isTopToolbar }) => ({
			sx: {
				display: isTopToolbar ? "block" : "none",
			},
		}),
		icons,
		...props,
	});

	return <MaterialReactTable table={table} />;
}
