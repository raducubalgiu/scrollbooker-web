import { PaginatedData } from "@/components/core/Table/Table";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import { get } from "@/utils/requests";
import dynamic from "next/dynamic";
import { JSX } from "react";

const PAGE_SIZE = 10;

const ServiceDomainsModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/ServiceDomainsModule/ServiceDomainsModule"
    )
);

async function ServiceDomains(): Promise<JSX.Element> {
  const businessDomainsResponse = await get<BusinessDomain[]>({
    url: `/business-domains`,
  });

  const businessDomains = businessDomainsResponse.data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching service-domains");
  }

  const serviceDomainsResponse = await get<
    PaginatedData<ServiceDomain> | undefined
  >({
    url: `/service-domains?page=1&limit=${PAGE_SIZE}`,
  });

  const serviceDomains = serviceDomainsResponse.data;

  if (!serviceDomains) {
    throw new Error("An error occured when fetching service-domains");
  }

  return (
    <ServiceDomainsModule
      initialData={serviceDomains}
      businessDomains={businessDomains}
      pageSize={PAGE_SIZE}
    />
  );
}

export default ProtectedPage(ServiceDomains, "NOMENCLATURES_VIEW");
