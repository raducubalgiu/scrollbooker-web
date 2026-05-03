import BusinessTypesModule from "@/components/modules/Admin/Nomenclatures/BusinessTypesModule/BusinessTypesModule";
import React from "react";
import { get } from "@/utils/requests";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";

async function BusinessTypes() {
  const businessDomains = (
    await get<BusinessDomain[]>({
      url: `/business-domains`,
    })
  ).data;

  return <BusinessTypesModule businessDomains={businessDomains} />;
}

export default ProtectedPage(BusinessTypes, "NOMENCLATURES_VIEW");
