import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServiceDomainsModule from "@/components/modules/Nomenclatures/ServiceDomainsModule/ServiceDomainsModule";

async function ServiceDomains() {
	return <ServiceDomainsModule />;
}

export default ProtectedPage(ServiceDomains, "NOMENCLATURES_VIEW");
