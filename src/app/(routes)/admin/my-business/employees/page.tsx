import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import MyEmployeesModule from "@/components/modules/Admin/MyBusiness/MyEmployeesModule/MyEmployeesModule";
import { authOptions } from "@/lib/auth/authOptions";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";
import React from "react";

async function Employees() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session is expired");
  }

  return <MyEmployeesModule session={session} />;
}

export default ProtectedPage(Employees, PermissionEnum.MY_EMPLOYEES_VIEW);
