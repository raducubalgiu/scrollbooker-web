import { PaginatedData } from "@/components/core/Table/Table";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { Profession } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { get } from "@/utils/requests";
import dynamic from "next/dynamic";
import React, { JSX } from "react";

const PAGE_SIZE = 10;

const ProfessionsModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/ProfessionsModule/ProfessionsModule"
    )
);

async function Professions(): Promise<JSX.Element> {
  const businessDomainsResponse = await get<BusinessDomain[]>({
    url: `/business-domains`,
  });

  const businessDomains = businessDomainsResponse.data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  const professionsResponse = await get<PaginatedData<Profession> | undefined>({
    url: `/professions?page=1&limit=${PAGE_SIZE}`,
  });

  const professions = professionsResponse.data;

  if (!professions) {
    throw new Error("An error occured when fetching business types");
  }

  return (
    <ProfessionsModule
      initialData={professions}
      businessDomains={businessDomains}
      pageSize={PAGE_SIZE}
    />
  );
}

export default ProtectedPage(Professions, "NOMENCLATURES_VIEW");
