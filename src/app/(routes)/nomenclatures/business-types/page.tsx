import BusinessTypesModule from "@/components/modules/Nomenclatures/BusinessTypesModule/BusinessTypesModule";
import React from "react";
import { get } from "@/utils/requests";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";

async function BusinessTypes() {
	const businessDomains = (
		await get<BusinessDomainType[]>({
			url: `/business-domains`,
		})
	).data;

	return <BusinessTypesModule businessDomains={businessDomains} />;
}

export default ProtectedPage(BusinessTypes, "NOMENCLATURES_VIEW");
