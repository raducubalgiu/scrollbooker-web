import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import PermissionsModule from "@/components/modules/PermissionsModule/PermissionsModule";
import React from "react";

async function RolesAndPermissions() {
	return <PermissionsModule />;
}

export default ProtectedPage(RolesAndPermissions, "NOMENCLATURES_VIEW");
