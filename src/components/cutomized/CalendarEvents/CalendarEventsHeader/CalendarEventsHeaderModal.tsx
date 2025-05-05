"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { useMutate } from "@/hooks/useHttp";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { DayInfo } from "../calendar-utils/calendar-types";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/core/Input/Input";
import { required, minField, maxField } from "@/utils/validation-rules";
import { Typography } from "@mui/material";
import InputSelect from "@/components/core/Input/InputSelect";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import dayjs from "dayjs";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";

type CalendarEventsHeaderModalProps = {
	day: DayInfo;
	open: boolean;
	handleClose: () => void;
	userId: number | undefined;
};

export default function CalendarEventsHeaderModal({
	day,
	open,
	handleClose,
	userId,
}: CalendarEventsHeaderModalProps) {
	const [editMessage, setEditMessage] = useState(false);
	const methods = useForm({
		defaultValues: { message: "Zi legală liberă" },
	});
	const { setValue, watch } = methods;
	const blockMessage = watch("message");
	const isRequired = required();
	const { updateDaySlots } = useCalendarEventsContext();

	const messages = [
		{ value: "Zi legală liberă", name: "Zi legală liberă" },
		{ value: "Concediu de odihnă", name: "Concediu de odihnă" },
		{ value: "Concediu medical", name: "Concediu medical" },
		{ value: "Altele", name: "Altele" },
	];

	const { mutate: handleBlock, isPending } = useMutate({
		key: ["block-day"],
		url: "/api/calendar/block-appointments",
		options: {
			onError: () =>
				toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu."),
			onSuccess: () => {
				const updatedSlots = day.slots.map(slot => {
					return {
						...slot,
						is_blocked: true,
						message: blockMessage,
					};
				});
				updateDaySlots(day.date, updatedSlots);
				toast.success("Datele au fost salvate cu succes!");
				handleClose();
			},
		},
	});

	const actions: ActionButtonType[] = [
		{
			title: "Blochează",
			props: {
				onClick: () => {
					if (userId) {
						const payload = day.slots.map(slot => {
							return {
								start_date: slot.start_date_utc,
								end_date: slot.end_date_utc,
								message: blockMessage,
								user_id: userId,
							};
						});
						handleBlock(payload);
					}
				},
				loading: isPending,
				disabled: !blockMessage,
			},
		},
	];

	return (
		<FormProvider {...methods}>
			<Modal
				title={`Data: ${dayjs(day.date).format("DD MMM YYYY")}`}
				open={open}
				handleClose={handleClose}
				actions={actions}
			>
				<Typography fontWeight={600}>
					Ești sigur că dorești să blochezi sloturile acestei zi?
				</Typography>
				<Typography sx={{ mt: 5 }}>
					{!editMessage
						? `Te rugăm să alegi din sugestiile de mai jos`
						: "Te rugăm să introduci un mesaj"}
				</Typography>
				<CustomStack sx={{ mt: 2.5 }}>
					{!editMessage && (
						<InputSelect
							name="message"
							rules={{ ...isRequired }}
							options={messages}
							placeholder="Te rugam sa selectezi"
						/>
					)}
					{editMessage && (
						<Input
							name="message"
							rules={{ ...isRequired, ...minField(3), ...maxField(100) }}
							placeholder="Te rugăm să introduci un mesaj"
						/>
					)}
					<EditChangeIconButton
						title="Comută către lista de sugestii"
						isEdit={editMessage}
						onClick={() => {
							setEditMessage(edit => !edit);
							setValue("message", "");
						}}
					/>
				</CustomStack>
			</Modal>
		</FormProvider>
	);
}
