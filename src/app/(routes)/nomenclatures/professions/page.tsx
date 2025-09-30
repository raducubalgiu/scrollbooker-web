import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ProfessionsModule from "@/components/modules/Nomenclatures/ProfessionsModule/ProfessionsModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import { get } from "@/utils/requests";
import React from "react";

async function Professions() {
	const businessDomains = (
		await get<BusinessDomainType[]>({
			url: `/business-domains`,
		})
	).data;

	return <ProfessionsModule businessDomains={businessDomains} />;
}

export default ProtectedPage(Professions, "NOMENCLATURES_VIEW");
