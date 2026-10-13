import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { Service } from "@/ts/models/nomenclatures/service/Service";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";

type GetSelectedServicesLabelParams = {
  businessDomains: BusinessDomain[];
  selectedServiceDomainId: number | null;
  selectedServiceId: number | null;
  selectedSubFilterIds: number[];
  services: Service[] | undefined;
  filters: Filter[] | undefined;
};

export const getSelectedServicesLabel = ({
  businessDomains,
  selectedServiceDomainId,
  selectedServiceId,
  selectedSubFilterIds,
  services,
  filters,
}: GetSelectedServicesLabelParams): string | null => {
  if (!selectedServiceDomainId) return null;

  const serviceDomainName = businessDomains
    .flatMap((domain) => domain.service_domains)
    .find((serviceDomain) => serviceDomain.id === selectedServiceDomainId)
    ?.name;

  if (!serviceDomainName) return null;
  if (!selectedServiceId) return serviceDomainName;

  const serviceName = services?.find(
    (service) => service.id === selectedServiceId
  )?.name;

  if (!serviceName) return serviceDomainName;
  if (selectedSubFilterIds.length === 0) return serviceName;

  const subFilterNames = selectedSubFilterIds
    .map(
      (subFilterId) =>
        filters
          ?.flatMap((filter) => filter.sub_filters)
          .find((subFilter) => subFilter.id === subFilterId)?.name
    )
    .filter((name): name is string => !!name);

  if (subFilterNames.length === 0) return serviceName;

  return `${serviceName} • ${subFilterNames.join(", ")}`;
};
