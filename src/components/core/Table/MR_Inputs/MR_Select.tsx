import {
	FormControl,
	FormControlProps,
	FormHelperText,
	MenuItem,
	Select,
} from "@mui/material";
import { MRT_Column, MRT_Row } from "material-react-table";
import React, { useCallback, useState } from "react";

type MR_SelectProps<T extends Record<string, unknown>> = {
	row: MRT_Row<T>;
	column: MRT_Column<T>;
	value: number;
	options: { name: string; value: number | undefined }[];
	required?: boolean;
} & FormControlProps;

export default function MR_Select<T extends Record<string, unknown>>({
	options,
	value,
	row,
	column,
	required = true,
	...props
}: MR_SelectProps<T>) {
	const [inputValue, setInputValue] = useState<number | null>(value);

	const handleBlur = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		row._valuesCache[column.id] = inputValue;
	}, [column.id, inputValue, row._valuesCache]);

	return (
		<FormControl
			error={required && !inputValue}
			fullWidth
			size="small"
			{...props}
		>
			<Select
				value={inputValue}
				onChange={e => setInputValue(Number(e.target.value))}
				onBlur={handleBlur}
				error={required && !inputValue}
			>
				{options.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.name}
					</MenuItem>
				))}
			</Select>
			<FormHelperText>
				{!inputValue ? "Acest câmp este obligatoriu" : ""}
			</FormHelperText>
		</FormControl>
	);
}
