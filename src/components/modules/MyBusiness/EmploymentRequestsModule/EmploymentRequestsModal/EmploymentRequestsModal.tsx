"use client";

import { ActionButtonType } from "@/components/core/ActionButton/ActionButton";
import Modal from "@/components/core/Modal/Modal";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Box } from "@mui/material";
import { isNull } from "lodash";
import EmploymentRequestsStepOne from "./EmploymentRequestsStepOne";
import EmploymentRequestsStepTwo from "./EmploymentRequestsStepTwo";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { ConsentType } from "@/ts/models/Consent/ConsentType";
import EmploymentRequestsStepThree from "./EmploymentRequestsStepThree";
import { ProfessionType } from "@/ts/models/Profession/ProfessionType";

const steps = [
	"Selectează viitorul angajat",
	"Alege poziția funcția noului angajat",
	"Trimite cererea de angajare",
];

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
	const [selectedProfessionId, setSelectedProfessionId] = useState<
		number | null
	>(null);
	const [stepIndex, setStepIndex] = useState<number>(0);
	const isFirstStep = stepIndex === 0;
	const isSecondStep = stepIndex === 1;
	const isThirdStep = stepIndex === 2;

	const { mutate: createEmploymentRequest, isPending } = useMutate({
		key: ["create-employment-request"],
		url: "/api/employment-requests",
		options: {
			onSuccess: () => {
				handleClose();
			},
		},
	});

	const { data: professions, isLoading: isLoadingProfessions } = useCustomQuery<
		ProfessionType[]
	>({
		key: ["get-professions"],
		url: "/api/employment-requests/professions",
		options: { enabled: isSecondStep && open },
	});

	const { data: consent, isLoading: isLoadingConsent } =
		useCustomQuery<ConsentType>({
			key: ["get-consent"],
			url: "/api/employment-requests/consent",
			params: { consentName: "EMPLOYMENT_REQUESTS_CONSENT" },
			options: { enabled: isThirdStep && open },
		});

	const disabledNextStep =
		(isNull(selectedUserId) && isFirstStep) ||
		(isNull(selectedProfessionId) && isSecondStep);

	const handleBack = () => {
		setStepIndex(prev => prev - 1);
		setSelectedUserId(null);
	};

	const handleEmploymentRequest = () =>
		createEmploymentRequest({
			employee_id: selectedUserId,
			consent_id: consent?.id,
			profession_id: selectedProfessionId,
		});

	const actions: ActionButtonType[] = [
		{
			title: "Înapoi",
			props: {
				onClick: handleBack,
				color: "inherit",
				disabled: isPending,
			},
			hidden: isFirstStep,
		},
		{
			title: "Pasul următor",
			props: {
				onClick: () => setStepIndex(prev => prev + 1),
				disabled: disabledNextStep,
			},
			hidden: isThirdStep,
		},
		{
			title: "Trimite cererea",
			props: {
				onClick: handleEmploymentRequest,
				disabled: !acknowledged || isPending,
				loading: isPending,
			},
			hidden: isFirstStep || isSecondStep,
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
				{isFirstStep && (
					<EmploymentRequestsStepOne
						selectedUserId={selectedUserId}
						onSelectUserId={setSelectedUserId}
					/>
				)}
				{isSecondStep && (
					<EmploymentRequestsStepTwo
						selectedProfessionId={selectedProfessionId}
						onSelectProfessionId={setSelectedProfessionId}
						professions={professions}
						isLoading={isLoadingProfessions}
					/>
				)}
				{isThirdStep && (
					<EmploymentRequestsStepThree
						consent={consent}
						isLoading={isLoadingConsent}
						acknowledged={acknowledged}
						setAcknowledged={setAcknowledged}
					/>
				)}
			</Box>
		</Modal>
	);
}
