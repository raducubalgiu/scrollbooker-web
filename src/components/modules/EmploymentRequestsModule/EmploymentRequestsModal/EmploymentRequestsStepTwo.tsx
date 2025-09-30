import React from "react";
import { Paper } from "@mui/material";
import ProfessionListItem from "@/components/cutomized/ProfessionListItem/ProfessionListItem";
import { ProfessionType } from "@/ts/models/Profession/ProfessionType";
import ProfessionListItemSkeletons from "@/components/cutomized/Skeletons/ProfessionListItemSkeletons";

type EmploymentRequestsStepTwoProps = {
	selectedProfessionId: number | null;
	onSelectProfessionId: (id: number) => void;
	professions: ProfessionType[] | undefined;
	isLoading: boolean;
};

export default function EmploymentRequestsStepTwo({
	selectedProfessionId,
	onSelectProfessionId,
	professions,
	isLoading,
}: EmploymentRequestsStepTwoProps) {
	return (
		<Paper sx={{ height: 300, my: 2.5, p: 2.5, overflow: "auto" }}>
			{!isLoading &&
				professions?.map(profession => (
					<ProfessionListItem
						key={profession.id}
						name={profession.name}
						isSelected={selectedProfessionId === profession.id}
						onClick={() => onSelectProfessionId(profession.id)}
					/>
				))}
			{isLoading && <ProfessionListItemSkeletons />}
		</Paper>
	);
}
