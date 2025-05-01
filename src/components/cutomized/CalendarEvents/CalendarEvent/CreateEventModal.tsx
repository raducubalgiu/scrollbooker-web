import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import { Typography } from "@mui/material";
import React from "react";

type CreateEventModalProps = { openCreate: boolean; handleClose: () => void };

export default function CreateEventModal({
	openCreate,
	handleClose,
}: CreateEventModalProps) {
	const actions: ActionButtonType[] = [{ title: "Save" }];

	return (
		<Modal
			open={openCreate}
			handleClose={handleClose}
			title="Creează o programare"
			actions={actions}
		>
			<Typography>Programare noua</Typography>
		</Modal>
	);
}
