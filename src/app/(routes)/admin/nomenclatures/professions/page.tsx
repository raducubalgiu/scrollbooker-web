import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ProfessionsModule from "@/components/modules/Admin/Nomenclatures/ProfessionsModule/ProfessionsModule";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { get } from "@/utils/requests";
import React, { JSX } from "react";

async function Professions(): Promise<JSX.Element> {
  const businessDomainsResponse = await get<BusinessDomain[]>({
    url: `/business-domains`,
  });

  const businessDomains = businessDomainsResponse.data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  return <ProfessionsModule businessDomains={businessDomains} />;
}

export default ProtectedPage(Professions, "NOMENCLATURES_VIEW");
