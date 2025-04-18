import { TextField, TextFieldProps } from "@mui/material";
import { MRT_Column, MRT_Row } from "material-react-table";
import React, { useCallback, useEffect, useRef, useState } from "react";

type MR_InputProps<T extends Record<string, unknown>> = {
	row: MRT_Row<T>;
	column: MRT_Column<T>;
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	type?: "text" | "number";
} & TextFieldProps;

export default function MR_Input<T extends Record<string, unknown>>({
	row,
	column,
	value,
	required,
	minLength,
	maxLength,
	min,
	max,
	type = "text",
	...props
}: MR_InputProps<T>) {
	const [error, setError] = useState<{ message: string }>({ message: "" });
	const [inputValue, setInputValue] = useState(value);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const runValidators = useCallback(
		(value: string | number) => {
			let message = "";

			if (type === "text") {
				if (required && String(value).trim() === "") {
					message = "Acest câmp este obligatoriu";
				} else if (minLength && String(value).length < minLength) {
					message = `Minimum length is ${minLength}`;
				} else if (!!maxLength && String(value).length > maxLength) {
					message = `Maximum length is ${maxLength}`;
				}
			}

			if (type === "number") {
				const numValue = Number(inputValue);
				if (required && !numValue && numValue !== 0) {
					message = "Acest camp este obligatoriu";
				} else if (!isNaN(numValue)) {
					if (typeof min === "number" && numValue < min && numValue !== 0) {
						message = `Valoarea minimă este ${min}`;
					} else if (typeof max === "number" && numValue > max) {
						message = `Valoarea maximă este ${max}`;
					}
				}
			}

			setError({ message });
		},
		[maxLength, minLength, required, min, max, type, inputValue]
	);

	const handleChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setInputValue(e.target.value);

			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			timeoutRef.current = setTimeout(() => runValidators(newValue), 500);
		},
		[runValidators]
	);

	useEffect(() => {
		runValidators(inputValue);

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [inputValue, runValidators]);

	const handleBlur = useCallback(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		row._valuesCache[column.id] = inputValue;
	}, [column.id, inputValue, row._valuesCache]);

	return (
		<TextField
			type={type}
			size="small"
			fullWidth
			value={inputValue}
			onChange={handleChangeInput}
			onBlur={handleBlur}
			error={!!error?.message}
			helperText={error?.message}
			{...props}
		/>
	);
}
