import { get } from "@/utils/requests";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServicesModule from "@/components/modules/Nomenclatures/ServicesModule/ServicesModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/BusinessDomainType";

async function Services() {
	const businessDomains = (
		await get<BusinessDomainType[]>({
			url: `/business-domains`,
		})
	).data;

	return <ServicesModule businessDomains={businessDomains} />;
}

export default ProtectedPage(Services, "NOMENCLATURES_VIEW");
