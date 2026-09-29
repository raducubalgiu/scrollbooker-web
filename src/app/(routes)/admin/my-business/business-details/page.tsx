import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MyBusinessDetailsModule from "@/components/modules/Admin/MyBusiness/MyBusinessDetailsModule/MyBusinessDetailsModule";

async function MyBusiness() {
  return <MyBusinessDetailsModule />;
}

export default ProtectedPage(
  MyBusiness,
  PermissionEnum.MY_BUSINESS_LOCATION_VIEW
);
