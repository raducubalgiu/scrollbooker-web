import { MenuItem, TextField, TextFieldProps } from "@mui/material";

export type SelectProps = {
	multiple?: boolean;
	loading?: boolean;
	options: { value: string; name: string }[];
	rules?: object;
} & TextFieldProps;

export default function Select({
	multiple = false,
	options,
	...props
}: SelectProps) {
	return (
		<TextField
			select
			id={`select-${props.name}`}
			defaultValue={multiple ? [] : ""}
			{...props}
		>
			{options?.map((option, i) => (
				<MenuItem
					key={`${option}-${i}`}
					id={option?.value ?? option}
					value={option?.value ?? option}
				>
					{option?.name ?? option}
				</MenuItem>
			))}
		</TextField>
	);
}
