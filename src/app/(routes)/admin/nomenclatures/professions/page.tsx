import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ProfessionsModule from "@/components/modules/Admin/Nomenclatures/ProfessionsModule/ProfessionsModule";
import React from "react";

async function Professions() {
  return <ProfessionsModule />;
}

export default ProtectedPage(Professions, "NOMENCLATURES_VIEW");
