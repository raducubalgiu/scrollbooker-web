import PermissionsModule from "@/components/modules/Admin/Nomenclatures/PermissionsModule/PermissionsModule";
import React, { JSX } from "react";

async function RolesAndPermissions(): Promise<JSX.Element> {
  return <PermissionsModule />;
}

export default RolesAndPermissions;
