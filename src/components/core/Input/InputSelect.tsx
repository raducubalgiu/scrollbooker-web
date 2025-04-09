import { TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";
import { has, get } from "lodash";

export type SelectProps = {
	multiple?: boolean;
	options: { value: string; name: string }[];
	rules?: object;
} & TextFieldProps;

export default function InputSelect({
	name,
	disabled = false,
	rules = {},
	options,
	...others
}: SelectProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<Controller
			control={control}
			name={name as string}
			rules={rules}
			render={({ field: { ref, value, ...field } }) => (
				<Select
					{...field}
					{...others}
					required={rules.hasOwnProperty("required")}
					fullWidth
					value={value ? value : ""}
					options={options ? options : []}
					error={has(errors, name as string)}
					helperText={get(errors, name)?.message}
					inputRef={ref}
					disabled={disabled}
				/>
			)}
		/>
	);
}
