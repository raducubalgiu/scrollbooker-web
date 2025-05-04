"use client";

import Modal from "@/components/core/Modal/Modal";
import React, { useState } from "react";
import { SlotType } from "../calendar-utils/calendar-types";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { toast } from "react-toastify";
import { useMutate } from "@/hooks/useHttp";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { Typography } from "@mui/material";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import InputSelect from "@/components/core/Input/InputSelect";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";
import { maxField, minField, required } from "@/utils/validation-rules";
import Input from "@/components/core/Input/Input";
import { useUserClientSession } from "@/lib/auth/get-user-client";
import { shortTimeFormat } from "@/utils/date-utils-dayjs";

type CalendarEventBlockSlotModalProps = {
	slot: SlotType;
	open: boolean;
	handleClose: () => void;
};

export default function CalendarEventBlockSlotModal({
	slot,
	open,
	handleClose,
}: CalendarEventBlockSlotModalProps) {
	const { userId } = useUserClientSession();
	const [editMessage, setEditMessage] = useState(false);
	const { handleBlockSlot } = useCalendarEventsContext();
	const methods = useForm({ defaultValues: { blockMessage: "" } });
	const { setValue, watch, handleSubmit } = methods;
	const blockMessage = watch("blockMessage");
	const isRequired = required();

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
				handleBlockSlot(slot, blockMessage);
				toast.success("Datele au fost salvate cu succes!");
				handleClose();
			},
		},
	});

	const actions: ActionButtonType[] = [
		{
			title: "Renunță",
			props: { onClick: handleClose, color: "inherit" },
		},
		{
			title: "Blochează",
			props: {
				onClick: handleSubmit(() =>
					handleBlock([
						{
							start_date: slot.start_date_utc,
							end_date: slot.end_date_utc,
							user_id: userId,
							block_message: blockMessage,
						},
					])
				),
				loading: isPending,
				disabled: !blockMessage,
			},
		},
	];

	return (
		<FormProvider {...methods}>
			<Modal
				title={`Data: ${dayjs(slot.start_date_locale).format("DD MMM YYYY")}, Slot: ${shortTimeFormat(slot.start_date_locale)}`}
				open={open}
				handleClose={handleClose}
				actions={actions}
			>
				<Typography fontWeight={600}>
					Ești sigur că dorești să blochezi acest slot?
				</Typography>
				<Typography sx={{ mt: 5 }}>Te rugăm să adaugi un mesaj</Typography>
				<CustomStack sx={{ mt: 2.5 }}>
					{!editMessage && (
						<InputSelect
							name="blockMessage"
							rules={{ ...isRequired }}
							options={messages}
							placeholder="Te rugăm sa selectezi"
						/>
					)}
					{editMessage && (
						<Input
							name="blockMessage"
							rules={{ ...isRequired, ...minField(3), ...maxField(100) }}
							placeholder="Te rugăm să introduci un mesaj"
						/>
					)}
					<EditChangeIconButton
						title="Comută către lista de sugestii"
						isEdit={editMessage}
						onClick={() => {
							setEditMessage(edit => !edit);
							setValue("blockMessage", "");
						}}
					/>
				</CustomStack>
			</Modal>
		</FormProvider>
	);
}
