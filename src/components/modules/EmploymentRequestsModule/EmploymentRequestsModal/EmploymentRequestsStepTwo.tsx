"use client";

import { useCustomQuery } from "@/hooks/useHttp";
import Consent from "@/components/cutomized/Consent/Consent";

type ConsentType = {
	id: number;
	name: string;
	title: string;
	text: string;
};

type EmploymentRequestsStepTwoProps = {
	acknowledged: boolean;
	setAcknowledged: (e: boolean) => void;
};

export default function EmploymentRequestsStepTwo({
	acknowledged,
	setAcknowledged,
}: EmploymentRequestsStepTwoProps) {
	const { data: consent, isLoading } = useCustomQuery<ConsentType>({
		key: ["get-consent"],
		url: "/api/employment-requests/consent",
		params: { consentName: "EMPLOYMENT_REQUESTS_CONSENT" },
	});

	const sections = consent?.text.split(/\n(?=\d+\. )/);

	return (
		<Consent
			mainTitle="Confirmare cerere angajare"
			sections={sections ?? []}
			acknowledged={acknowledged}
			setAcknowledged={setAcknowledged}
			isLoading={isLoading}
		/>
	);
}
