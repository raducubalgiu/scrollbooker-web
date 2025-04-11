import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";

type InputCheckboxProps = {
	name: string;
	label: string;
	disabled?: boolean;
};

export default function InputCheckbox({
	name,
	label,
	disabled = false,
}: InputCheckboxProps) {
	return (
		<FormControlLabel
			sx={{ pt: 2 }}
			control={
				<Controller
					name={name}
					render={({ field: { value, ...field } }) => (
						<Checkbox
							{...field}
							checked={value ?? false}
							value={value ?? false}
							disabled={disabled}
						/>
					)}
				/>
			}
			label={label}
		/>
	);
}
