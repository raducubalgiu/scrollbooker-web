import { get } from "@/utils/requests";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServicesModule from "@/components/modules/Nomenclatures/ServicesModule/ServicesModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/ServiceDomainType";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";

async function Services() {
	const businessDomains = (
		await get<BusinessDomainType[]>({
			url: `/business-domains`,
		})
	).data;

	const serviceDomains = (
		await get<ServiceDomainsResponse[]>({
			url: `/service-domains`,
		})
	).data;

	const filters = (
		await get<FilterType[]>({
			url: `/filters`,
		})
	).data;

	return (
		<ServicesModule 
			businessDomains={businessDomains} 
			serviceDomains={serviceDomains}
			filters={filters}
		/>
	)
}

export default ProtectedPage(Services, "NOMENCLATURES_VIEW");
