import { get } from "@/utils/requests";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ServiceDomain } from "@/ts/models/nomenclatures/serviceDomain/ServiceDomainType";
import dynamic from "next/dynamic";
import { PaginatedData } from "@/components/core/Table/Table";
import { Service } from "@/ts/models/nomenclatures/service/Service";

const PAGE_SIZE = 10;

const ServicesModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/ServicesModule/ServicesModule"
    )
);

async function Services() {
  const businessDomainsResponse = await get<BusinessDomain[]>({
    url: `/business-domains`,
  });

  const businessDomains = businessDomainsResponse.data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  const serviceDomainsResponse = await get<ServiceDomain[]>({
    url: `/service-domains`,
  });

  const serviceDomains = serviceDomainsResponse.data;

  if (!serviceDomains) {
    throw new Error("An error occured when fetching service domains");
  }

  const servicesResponse = await get<PaginatedData<Service> | undefined>({
    url: `/services?page=1&limit=${PAGE_SIZE}`,
  });

  const services = servicesResponse.data;

  if (!services) {
    throw new Error("An error occured when fetching services");
  }

  return (
    <ServicesModule
      initialData={services}
      businessDomains={businessDomains}
      serviceDomains={serviceDomains}
      pageSize={PAGE_SIZE}
    />
  );
}

export default ProtectedPage(Services, "NOMENCLATURES_VIEW");
