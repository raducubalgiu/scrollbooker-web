import MyProductsModule from "@/components/modules/MyBusiness/MyProductsModule/MyProductsModule";
import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getUserServerSession } from "@/lib/auth/get-user-server";

async function Products() {
  const session = await getUserServerSession();

  return <MyProductsModule session={session.session} />;
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
