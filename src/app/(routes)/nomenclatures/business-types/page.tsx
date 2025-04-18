import BusinessTypesModule from "@/components/modules/Nomenclatures/BusinessTypesModule/BusinessTypesModule";
import React from "react";
import { get } from "@/utils/requests";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessDomainType } from "@/models/nomenclatures/BusinessDomainType";

export default async function BusinessTypes() {
	const businessDomains = (
		await get<PaginatedData<BusinessDomainType>>({
			url: `/business-domains?page=1&limit=10`,
		})
	).data;

	return <BusinessTypesModule businessDomains={businessDomains?.results} />;
}
