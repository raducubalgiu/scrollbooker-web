import { get } from "@/utils/requests";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServicesModule from "@/components/modules/Nomenclatures/ServicesModule/ServicesModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";
import { ServiceDomainsResponse } from "@/ts/models/nomenclatures/ServiceDomainType";

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

	return (
		<ServicesModule 
			businessDomains={businessDomains} 
			serviceDomains={serviceDomains}
		/>
	)
}

export default ProtectedPage(Services, "NOMENCLATURES_VIEW");
