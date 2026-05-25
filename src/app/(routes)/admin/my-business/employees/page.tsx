import { PaginatedData } from "@/components/core/Table/Table";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { authOptions } from "@/lib/auth/authOptions";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import React from "react";

const PAGE_SIZE = 10;

const MyEmployeesModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/MyBusiness/MyEmployeesModule/MyEmployeesModule"
    )
);

async function Employees() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session was not found");
  }

  if (!session.business_owner_id) {
    throw new Error("Business Owner Id was not found in the session");
  }

  const employeesResponse = await get<PaginatedData<BusinessEmployee>>({
    url: `/businesses/owner/${session?.business_owner_id}/employees?page=1&limit=${PAGE_SIZE}`,
  });

  const employees = employeesResponse.data;

  if (!employees) {
    throw new Error("An error occured when fetching business types");
  }

  return <MyEmployeesModule initialData={employees} pageSize={PAGE_SIZE} />;
}

export default ProtectedPage(Employees, PermissionEnum.MY_EMPLOYEES_VIEW);
