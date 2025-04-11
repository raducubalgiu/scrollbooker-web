"use client";

import {
	Divider,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	ScheduleResponseType,
	ScheduleUpdateType,
} from "@/models/ScheduleType";
import SchedulesSelectHours from "./SchedulesSelectHours";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import ActionButton, {
	ActionButtonType,
} from "@/components/core/ActionButton/ActionButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type SchedulesProps = { data: ScheduleResponseType[] };

const updateSchedule = async (data: ScheduleUpdateType[]) => {
	const response = await axios.put(`/api/schedules`, data);
	return response.data;
};

export default function SchedulesModule({ data }: SchedulesProps) {
	const [disabled, setDisabled] = useState(true);

	const methods = useForm({
		defaultValues: {
			schedules: data.map(schedule => {
				const { start_time, end_time } = schedule;
				return {
					...schedule,
					start_time: start_time ? start_time : "closed",
					end_time: end_time ? end_time : "closed",
				};
			}),
		},
	});
	const { watch, reset, handleSubmit } = methods;
	const { schedules } = watch();

	const { mutate, isPending } = useMutation({
		mutationFn: updateSchedule,
		onSuccess: () => {
			toast.success("Ti-ai salvat cu succes programul!");
			setDisabled(true);
		},
		onError: () => {},
	});

	const handleSave = (new_data: { schedules: ScheduleResponseType[] }) => {
		const updated_schedules = new_data.schedules.map(schedule => {
			const { id, start_time, end_time } = schedule;
			return {
				id,
				start_time: start_time == "closed" ? null : start_time,
				end_time: end_time == "closed" ? null : end_time,
			};
		});
		mutate(updated_schedules);
	};

	const actions: ActionButtonType[] = [
		{
			title: "Renunta",
			hidden: disabled,
			props: {
				color: "inherit",
				onClick: () => {
					reset();
					setDisabled(true);
				},
			},
		},
		{
			title: "Editeaza",
			hidden: !disabled,
			props: {
				onClick: () => setDisabled(false),
			},
		},
		{
			title: "Salveaza",
			hidden: disabled,
			props: {
				onClick: handleSubmit(handleSave),
				loading: isPending,
			},
		},
	];

	return (
		<FormProvider {...methods}>
			<Paper sx={{ p: 2.5 }}>
				<Typography sx={{ fontSize: 20 }}>Programul locatiei:</Typography>
				<Divider sx={{ mt: 2.5 }} />
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "600" }}>Ziua saptamanii</TableCell>
							<TableCell sx={{ fontWeight: "600" }} align="center">
								Ora de start
							</TableCell>
							<TableCell sx={{ fontWeight: "600" }} align="center">
								Ora de sfarsit
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{schedules?.map((schedule, i) => (
							<SchedulesSelectHours
								key={i}
								schedule={schedule}
								namePath={`schedules.${i}`}
								disabled={disabled}
							/>
						))}
					</TableBody>
				</Table>
				<Stack alignItems="flex-end" sx={{ py: 1.5 }}>
					<ActionButton actions={actions} />
				</Stack>
			</Paper>
		</FormProvider>
	);
}
