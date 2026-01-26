import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import MyEmployeesModule from "@/components/modules/MyBusiness/MyEmployeesModule/MyEmployeesModule";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import React from "react";

async function Employees() {
  return <MyEmployeesModule />;
}

export default ProtectedPage(Employees, PermissionEnum.MY_EMPLOYEES_VIEW);
