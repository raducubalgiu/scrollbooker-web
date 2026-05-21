import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import BusinessDomainsModule from "@/components/modules/Admin/Nomenclatures/BusinessDomainsModule/BusinessDomainsModule";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { get } from "@/utils/requests";

async function BusinessDomains() {
  const response = await get<BusinessDomain[]>({
    url: "/business-domains",
  });

  const initialData = response?.data || [];

  return <BusinessDomainsModule initialData={initialData} />;
}

export default ProtectedPage(BusinessDomains, "NOMENCLATURES_VIEW");
