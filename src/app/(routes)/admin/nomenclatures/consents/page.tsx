import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ConsentsModule from "@/components/modules/Admin/Nomenclatures/ConsentsModule/ConsentsModule";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";
import { get } from "@/utils/requests";
import React from "react";

async function ConsentsPage() {
  const response = await get<Consent[]>({
    url: "/consents",
  });

  const initialData = response?.data || [];

  return <ConsentsModule initialData={initialData} />;
}

export default ProtectedPage(ConsentsPage, "NOMENCLATURES_VIEW");
