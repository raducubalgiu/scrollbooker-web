"use client";

import Consent from "@/components/cutomized/Consent/Consent";
import { ConsentType } from "@/models/ConsentType";

type EmploymentRequestsStepThreeProps = {
	consent: ConsentType | undefined;
	isLoading: boolean;
	acknowledged: boolean;
	setAcknowledged: (e: boolean) => void;
};

export default function EmploymentRequestsStepThree({
	consent,
	isLoading,
	acknowledged,
	setAcknowledged,
}: EmploymentRequestsStepThreeProps) {
	const sections = consent?.text?.split(/\n(?=\d+\. )/);

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
