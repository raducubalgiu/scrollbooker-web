import React, { useState } from "react";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { required, minField, maxField } from "@/utils/validation-rules";
import Modal from "@/components/core/Modal/Modal";
import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { useMutate } from "@/hooks/useHttp";
import { SlotType } from "../calendar-types";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import { toast } from "react-toastify";

type CalendarEventCancelModalProps = {
	slot: SlotType;
	open: boolean;
	handleClose: () => void;
};

export default function CalendarEventCancelModal({
	slot,
	open,
	handleClose,
}: CalendarEventCancelModalProps) {
	const { updateSlot } = useCalendarEventsContext();
	const [editMessage, setEditMessage] = useState(false);
	const methods = useForm({ defaultValues: { message: "" } });
	const { setValue, watch, handleSubmit, reset } = methods;
	const message = watch("message");
	const isRequired = required();

	const { mutate: handleCancel, isPending } = useMutate({
		key: ["cancel-appointment"],
		url: "/api/calendar/cancel-appointment",
		method: "PUT",
		options: {
			onSuccess: () => {
				updateSlot({
					...slot,
					id: null,
					is_booked: false,
					info: null,
				});
				toast.success("Anulareaa a fost anulată cu succes");
			},
		},
	});

	const actions: ActionButtonType[] = [
		{
			title: "Renunță",
			props: {
				onClick: () => {
					reset();
					handleClose();
				},
				color: "inherit",
			},
		},
		{
			title: "Anulează",
			props: {
				onClick: handleSubmit(() =>
					handleCancel({ appointmentId: slot.id, message })
				),
				loading: isPending,
				disabled: !message,
			},
		},
	];

	const messages = [
		{ value: "Probleme personale", name: "Probleme personale" },
		{ value: "Altele", name: "Altele" },
	];

	return (
		<FormProvider {...methods}>
			<Modal
				open={open}
				handleClose={() => {
					reset();
					handleClose();
				}}
				title="Ești sigur că dorești să anulezi această programare?"
				actions={actions}
			>
				<Typography sx={{ mt: 5 }}>Te rugăm să adaugi un mesaj</Typography>
				<CustomStack sx={{ mt: 2.5 }}>
					{!editMessage && (
						<InputSelect
							name="message"
							rules={{ ...isRequired }}
							options={messages}
							placeholder="Selectează din listă"
						/>
					)}
					{editMessage && (
						<Input
							name="message"
							rules={{ ...isRequired, ...minField(3), ...maxField(50) }}
							placeholder="Introdu un mesaj"
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
