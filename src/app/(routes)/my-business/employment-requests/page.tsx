import React from "react";
import EmploymentRequestsModule from "@/components/modules/MyBusiness/EmploymentRequestsModule/EmploymentRequestsModule";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

async function EmploymentRequests() {
  return <EmploymentRequestsModule />;
}

export default ProtectedPage(
  EmploymentRequests,
  PermissionEnum.MY_EMPLOYMENT_REQUESTS_VIEW
);
