"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";
import { isNull } from "lodash";
import EmploymentRequestsStepTwo from "./EmploymentRequestsStepTwo";
import EmploymentRequestsStepOne from "./EmploymentRequestsStepOne";

const steps = ["Selectează viitorul angajat", "Trimite cererea de angajare"];

type EmploymentRequestsModalProps = {
	open: boolean;
	handleClose: () => void;
};

export default function EmploymentRequestsModal({
	open,
	handleClose,
}: EmploymentRequestsModalProps) {
	const [acknowledged, setAcknowledged] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const [stepIndex, setStepIndex] = useState<number>(0);

	const actions: ActionButtonType[] = [
		{
			title: "Pasul următor",
			props: {
				onClick: () => setStepIndex(prev => prev + 1),
				disabled: isNull(selectedUserId),
			},
			hidden: stepIndex === 1,
		},
		{
			title: "Înapoi",
			props: {
				onClick: () => setStepIndex(prev => prev - 1),
				color: "inherit",
			},
			hidden: stepIndex === 0,
		},
		{
			title: "Trimite cererea",
			props: {
				onClick: () => {},
				disabled: !acknowledged,
			},
			hidden: stepIndex === 0,
		},
	];

	return (
		<Modal
			title="Trimite o cerere de angajare"
			open={open}
			handleClose={handleClose}
			actions={actions}
		>
			<Box sx={{ minWidth: 700 }}>
				<Stepper activeStep={stepIndex} alternativeLabel>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{stepIndex === 0 && (
					<EmploymentRequestsStepOne
						selectedUserId={selectedUserId}
						setSelectedUserId={setSelectedUserId}
					/>
				)}
				{stepIndex === 1 && (
					<EmploymentRequestsStepTwo
						acknowledged={acknowledged}
						setAcknowledged={setAcknowledged}
					/>
				)}
			</Box>
		</Modal>
	);
}
