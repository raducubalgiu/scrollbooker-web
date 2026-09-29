import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import BusinessDomainsModule from "@/components/modules/Admin/Nomenclatures/BusinessDomainsModule/BusinessDomainsModule";
import { JSX } from "react";

async function BusinessDomains(): Promise<JSX.Element> {
  return <BusinessDomainsModule />;
}

export default ProtectedPage(BusinessDomains, "NOMENCLATURES_VIEW");
