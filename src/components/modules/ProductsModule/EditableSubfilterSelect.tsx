import { FilterType } from "@/models/nomenclatures/FilterType";
import { ProductType } from "@/models/Product/ProductResponse";
import { MenuItem, Select } from "@mui/material";
import {
	MRT_Cell,
	MRT_Column,
	MRT_Row,
	MRT_TableInstance,
} from "material-react-table";
import { useEffect } from "react";

type EditableSubfilterSelectProps = {
	cell: MRT_Cell<ProductType>;
	row: MRT_Row<ProductType>;
	column: MRT_Column<ProductType>;
	table: MRT_TableInstance<ProductType>;
	filterIndex: number;
	filter: FilterType;
};

export default function EditableSubfilterSelect({
	cell,
	row,
	column,
	table,
	filterIndex,
	filter,
}: EditableSubfilterSelectProps) {
	const subFilters = row.original.sub_filters ?? [];
	const defaultValue = subFilters[filterIndex]?.id;

	useEffect(() => {
		table.options.meta?.updateData?.(row.index, column.id, defaultValue);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Select
			value={cell.getValue() ?? defaultValue}
			fullWidth
			size="small"
			onChange={e => {
				const value = e.target.value;
				console.log("ROW INDEX", row.index);
				console.log("COLUMN ID!!!", column.id);
				console.log("VALUE!!!", value);
				table.options.meta?.updateData?.(row.index, column.id, value);
			}}
		>
			{filter.sub_filters?.map(sub => (
				<MenuItem key={sub.id} value={sub.id}>
					{sub.name}
				</MenuItem>
			))}
		</Select>
	);
}
