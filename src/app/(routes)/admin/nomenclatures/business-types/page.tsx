import React from "react";
import { get } from "@/utils/requests";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PaginatedData } from "@/components/core/Table/Table";
import { BusinessType } from "@/ts/models/nomenclatures/businessType/BusinessType";
import dynamic from "next/dynamic";

const PAGE_SIZE = 5;

const BusinessTypesModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/BusinessTypesModule/BusinessTypesModule"
    )
);

async function BusinessTypes() {
  const businessDomains = (
    await get<BusinessDomain[]>({
      url: `/business-domains`,
    })
  ).data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  const response = (
    await get<PaginatedData<BusinessType> | undefined>({
      url: `/business-types?page=1&limit=${PAGE_SIZE}`,
    })
  ).data;

  if (!response) {
    throw new Error("An error occured when fetching business types");
  }

  return (
    <BusinessTypesModule
      initialData={response}
      pageSize={PAGE_SIZE}
      businessDomains={businessDomains}
    />
  );
}

export default ProtectedPage(BusinessTypes, "NOMENCLATURES_VIEW");
