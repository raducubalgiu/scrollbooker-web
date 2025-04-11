"use client";

import { TableCell, TableRow } from "@mui/material";
import { ScheduleResponseType } from "@/models/ScheduleType";
import InputSelect from "@/components/core/Input/InputSelect";
import { useTimeSlots } from "@/hooks/useTimeSlots";
import { useFormContext } from "react-hook-form";

type SchedulesSelectHoursProps = {
	schedule: ScheduleResponseType;
	namePath: string;
	disabled: boolean;
};

export default function SchedulesSelectHours({
	schedule,
	namePath,
	disabled,
}: SchedulesSelectHoursProps) {
	const slots = useTimeSlots();
	const { watch } = useFormContext();
	const closed = { value: "closed", name: "Inchis" };
	const startTime = watch(`${namePath}.start_time`);

	const isGreatherThan = () => ({
		validate: (endTime: string) => {
			if (endTime < startTime) {
				return "Data de sfarsit nu poate fi mai mica sau egala decat data de inceput";
			}
			return true;
		},
	});

	return (
		<TableRow>
			<TableCell>{schedule.day_of_week}</TableCell>
			<TableCell align="center">
				<InputSelect
					name={`${namePath}.start_time`}
					options={[closed, ...slots]}
					disabled={disabled}
					size="small"
				/>
			</TableCell>
			<TableCell align="center">
				<InputSelect
					name={`${namePath}.end_time`}
					options={[closed, ...slots]}
					disabled={disabled}
					size="small"
					rules={isGreatherThan()}
				/>
			</TableCell>
		</TableRow>
	);
}
