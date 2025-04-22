import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import RolesAndPermissionsModule from "@/components/modules/RolesAndPermissionsModule/RolesAndPermissionsModule";
import React from "react";

async function RolesAndPermissions() {
	return <RolesAndPermissionsModule />;
}

export default ProtectedPage(RolesAndPermissions, "NOMENCLATURES_VIEW");
