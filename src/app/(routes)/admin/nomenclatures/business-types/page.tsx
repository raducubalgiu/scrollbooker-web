import React, { JSX } from "react";
import { get } from "@/utils/requests";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import BusinessTypesModule from "@/components/modules/Admin/Nomenclatures/BusinessTypesModule/BusinessTypesModule";

async function BusinessTypes(): Promise<JSX.Element> {
  const businessDomains = (
    await get<BusinessDomain[]>({
      url: `/business-domains`,
    })
  ).data;

  if (!businessDomains) {
    throw new Error("An error occured when fetching business domains");
  }

  return <BusinessTypesModule businessDomains={businessDomains} />;
}

export default ProtectedPage(BusinessTypes, "NOMENCLATURES_VIEW");
