import React from "react";
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from "@mui/material";

type EmployeeOptionsType = { id: number; username: string };

type DashboardEmployeesSelectProps = {
	options: EmployeeOptionsType[];
	selectedEmployeeId: number | undefined;
	onSetSelectedEmployee: (event: SelectChangeEvent<number>) => void;
};

export default function DashboardEmployeesSelect({
	options,
	selectedEmployeeId,
	onSetSelectedEmployee,
}: DashboardEmployeesSelectProps) {
	return (
		<FormControl sx={{ minWidth: 250 }}>
			<InputLabel id="employees">Angajați</InputLabel>
			<Select
				labelId="employees"
				id="employees"
				value={selectedEmployeeId}
				label="Angajați"
				onChange={onSetSelectedEmployee}
			>
				{options?.map((employee, i) => (
					<MenuItem key={i} value={employee.id}>
						{employee.username}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
