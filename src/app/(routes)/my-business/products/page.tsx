import MyProductsModule from "@/components/modules/MyBusiness/MyProductsModule/MyProductsModule";
import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

async function Products() {
  const { userId } = await getUserServerSession();

  return <MyProductsModule />;
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
