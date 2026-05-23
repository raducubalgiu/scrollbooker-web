import { PaginatedData } from "@/components/core/Table/Table";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { Profession } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { get } from "@/utils/requests";
import dynamic from "next/dynamic";
import React from "react";

const PAGE_SIZE = 10;

const ProfessionsModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/ProfessionsModule/ProfessionsModule"
    )
);

async function Professions() {
  const businessDomains = (
    await get<BusinessDomain[]>({
      url: `/business-domains`,
    })
  ).data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  const response = (
    await get<PaginatedData<Profession> | undefined>({
      url: `/professions?page=1&limit=${PAGE_SIZE}`,
    })
  ).data;

  if (!response) {
    throw new Error("An error occured when fetching business types");
  }

  return (
    <ProfessionsModule
      initialData={response}
      businessDomains={businessDomains}
      pageSize={PAGE_SIZE}
    />
  );
}

export default ProtectedPage(Professions, "NOMENCLATURES_VIEW");
