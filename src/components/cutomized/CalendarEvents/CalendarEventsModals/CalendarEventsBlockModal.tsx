import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { minField, maxField, required } from "@/utils/validation-rules";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import Input from "@/components/core/Input/Input";
import InputSelect from "@/components/core/Input/InputSelect";
import EditChangeIconButton from "../../IconButtons/EditChangeIconButton";
import Modal from "@/components/core/Modal/Modal";
import { toast } from "react-toastify";
import { useMutate } from "@/hooks/useHttp";
import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import { isEmpty } from "lodash";

export type BlockUpdater = {
	startDate: string;
	endDate: string;
	userId: number | undefined;
}[];

type CalendarEventsBlockModalProps = {
	open: boolean;
	handleClose: () => void;
	messages: { value: string; name: string }[];
	onSuccessUpdate: (message: string) => void;
	updater: BlockUpdater;
	title: string;
	description: string;
};

export default function CalendarEventsBlockModal({
	open,
	handleClose,
	onSuccessUpdate,
	messages,
	updater,
	title,
	description,
}: CalendarEventsBlockModalProps) {
	const [editMessage, setEditMessage] = useState(false);
	const methods = useForm({ defaultValues: { message: "" } });
	const { setValue, watch, handleSubmit, reset } = methods;
	const message = watch("message");
	const isRequired = required();

	const { mutate: handleBlock, isPending } = useMutate({
		key: ["block-day"],
		url: "/api/calendar/block-appointments",
		options: {
			onError: () =>
				toast.error("Ceva nu a mers cum trebuie. Încearcă mai târziu."),
			onSuccess: () => onSuccessUpdate(message),
		},
	});

	const handleUpdate = () => {
		if (isEmpty(updater)) return;

		const updaterWithMessage = updater.map(updater => ({
			...updater,
			message,
		}));
		handleBlock(updaterWithMessage);
	};

	const handleCancel = () => {
		reset();
		handleClose();
	};

	const actions: ActionButtonType[] = [
		{
			title: "Renunță",
			props: { onClick: handleCancel, color: "inherit" },
		},
		{
			title: "Blochează",
			props: {
				onClick: handleSubmit(handleUpdate),
				loading: isPending,
				disabled: !message,
			},
		},
	];

	return (
		<FormProvider {...methods}>
			<Modal
				open={open}
				handleClose={handleCancel}
				title={title}
				actions={actions}
			>
				<Typography fontWeight={600}>{description}</Typography>
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
