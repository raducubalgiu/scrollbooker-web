import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UnapprovedBusinessModule from "@/components/modules/Admin/UnapprovedBusinessModule/UnapprovedBusinessModule";
import { JSX } from "react";

async function ValidateBusiness(): Promise<JSX.Element> {
  return <UnapprovedBusinessModule />;
}

export default ProtectedPage(ValidateBusiness, "NOMENCLATURES_VIEW");
