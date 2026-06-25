import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import PermissionsModule from "@/components/modules/Admin/PermissionsModule/PermissionsModule";
import React, { JSX } from "react";

async function RolesAndPermissions(): Promise<JSX.Element> {
  return <PermissionsModule />;
}

export default ProtectedPage(RolesAndPermissions, "NOMENCLATURES_VIEW");
