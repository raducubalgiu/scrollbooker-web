import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServiceDomainsModule from "@/components/modules/Admin/Nomenclatures/ServiceDomainsModule/ServiceDomainsModule";
import { BusinessDomainType } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { get } from "@/utils/requests";

async function ServiceDomains() {
  const businessDomains = (
    await get<BusinessDomainType[]>({
      url: `/business-domains`,
    })
  ).data;

  return <ServiceDomainsModule businessDomains={businessDomains} />;
}

export default ProtectedPage(ServiceDomains, "NOMENCLATURES_VIEW");
