import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { find } from "lodash";

export const getServiceDomainName = (
  businessDomains: BusinessDomain[] | undefined,
  businessDomainId: number | null,
  serviceDomainId: number | null
): string | null => {
  if (!businessDomainId || !serviceDomainId || !businessDomains) return null;

  const selectedBusinessDomain = find(businessDomains, {
    id: businessDomainId,
  });

  if (!selectedBusinessDomain) return null;

  return (
    find(selectedBusinessDomain.service_domains, { id: serviceDomainId })
      ?.name ?? null
  );
};
