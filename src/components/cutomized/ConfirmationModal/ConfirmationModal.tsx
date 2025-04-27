"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Typography } from "@mui/material";
import React from "react";

type ConfirmationModalProps = {
	isLoading?: boolean;
	message: string;
	open: boolean;
	handleClose: () => void;
	handleSubmit: () => void;
};

export default function ConfirmationModal({
	isLoading = false,
	message,
	open,
	handleClose,
	handleSubmit,
}: ConfirmationModalProps) {
	const actions: ActionButtonType[] = [
		{
			title: "NU",
			props: { onClick: handleClose, color: "inherit" },
		},
		{
			title: "DA",
			props: { onClick: handleSubmit, loading: isLoading },
		},
	];

	return (
		<Modal open={open} handleClose={handleClose} actions={actions}>
			<Typography>{message}</Typography>
		</Modal>
	);
}
