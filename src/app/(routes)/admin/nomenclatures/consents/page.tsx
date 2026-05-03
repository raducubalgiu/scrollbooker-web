import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ConsentsModule from "@/components/modules/Admin/Nomenclatures/ConsentsModule/ConsentsModule";
import React from "react";

async function ConsentsPage() {
  return <ConsentsModule />;
}

export default ProtectedPage(ConsentsPage, "NOMENCLATURES_VIEW");
