"use client";

import React, { useEffect, useState } from "react";
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
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Button } from "@mui/material";
import { Check, Delete } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import AddIconButton from "@/components/cutomized/IconButtons/AddIconButton";

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
	onDeletingRowSave?: ({
		row,
		table,
	}: TableRowAndTable<T>) => Promise<void> | void;
	topToolbarIconButton?: boolean;
} & Partial<MRT_TableOptions<T>>;

export default function Table<T extends Record<string, unknown>>({
	data,
	columns,
	manualPagination = false,
	onDeletingRowSave,
	topToolbarIconButton,
	...props
}: TableProps<T>) {
	const [tableData, setTableData] = useState<T[] | undefined>([]);

	useEffect(() => {
		setTableData(data);
	}, [data]);

	const renderRowActionMenuItems = ({ row, table }: TableRowAndTable<T>) => [
		<MRT_ActionMenuItem
			key={2}
			label="Șterge"
			icon={<Delete />}
			onClick={() => onDeletingRowSave && onDeletingRowSave({ row, table })}
			table={table}
		/>,
	];

	const renderTopToolbarCustomActions = ({
		table,
	}: {
		table: MRT_TableInstance<T>;
	}) =>
		topToolbarIconButton ? (
			<AddIconButton
				onClick={() => table.setCreatingRow(true)}
				color="primary"
			/>
		) : (
			<Button onClick={() => table.setCreatingRow(true)} variant="contained">
				Adaugă
			</Button>
		);

	const icons = {
		SaveIcon: () => <Check color="success" />,
		CancelIcon: () => <CloseIcon color="error" />,
	};

	function updateData<T>(
		rowIndex: number,
		columnId: keyof T,
		value: unknown,
		setData: React.Dispatch<React.SetStateAction<T[] | undefined>>
	) {
		setData(prev =>
			prev?.map((row, index) =>
				index === rowIndex ? { ...row, [columnId]: value } : row
			)
		);
	}

	const table = useMaterialReactTable({
		columns,
		data: tableData ?? [],
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
		meta: {
			updateData: (rowIndex, columnId, value) =>
				updateData(rowIndex, columnId as keyof T, value, setTableData),
		},
		localization: MRT_Localization_RO,
		...props,
	});

	return <MaterialReactTable table={table} />;
}
