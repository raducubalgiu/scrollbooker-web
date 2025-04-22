import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import BusinessDomainsModule from "@/components/modules/Nomenclatures/BusinessDomainsModule/BusinessDomainsModule";

async function BusinessDomains() {
	return <BusinessDomainsModule />;
}

export default ProtectedPage(BusinessDomains, "NOMENCLATURES_VIEW");
