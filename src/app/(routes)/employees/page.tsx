import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import EmployeesModule from "@/components/modules/EmployeesModule/EmployeesModule";
import { PermissionEnum } from "@/models/enums/PermissionsEnum";
import React from "react";

async function Employees() {
	return <EmployeesModule />;
}

export default ProtectedPage(Employees, PermissionEnum.MY_EMPLOYEES_VIEW);
