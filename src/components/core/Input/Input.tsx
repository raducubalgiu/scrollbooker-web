import { Controller, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { has } from "lodash";

export type InputProps = {
	rules?: object;
} & TextFieldProps;

export default function Input({
	name,
	label,
	rules = {},
	...props
}: InputProps) {
	const {
		control,
		formState: { errors },
		register,
	} = useFormContext<{ [x: string]: string }>();

	return (
		<Controller
			control={control}
			name={name as string}
			rules={rules}
			render={({ field: { value, ...field } }) => (
				<TextField
					{...field}
					{...props}
					{...register(name as string, { ...rules })}
					fullWidth
					value={value ?? ""}
					label={label}
					error={has(errors, name as string)}
					helperText={errors[name as string]?.message}
					required={has(rules, "required")}
				/>
			)}
		/>
	);
}
