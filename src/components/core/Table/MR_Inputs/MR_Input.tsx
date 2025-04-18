import { TextField, TextFieldProps } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

type MR_Input = {
	value: string | number;
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	type?: "text" | "number";
} & TextFieldProps;

export default function MR_Input({
	value,
	required,
	minLength,
	maxLength,
	min,
	max,
	type = "text",
	...props
}: MR_Input) {
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
				const numValue = Number(value);
				if (required && isNaN(numValue)) {
					message = "Acest camp este obligatoriu";
				} else if (!isNaN(numValue)) {
					if (typeof min === "number" && numValue < min) {
						message = `Valoarea minimă este ${min}`;
					} else if (typeof max === "number" && numValue > max) {
						message = `Valoarea maximă este ${max}`;
					}
				}
			}

			setError({ message });
		},
		[maxLength, minLength, required, min, max, type]
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

	return (
		<TextField
			size="small"
			fullWidth
			value={inputValue}
			onChange={handleChangeInput}
			error={!!error?.message}
			helperText={error?.message}
			{...props}
		/>
	);
}
