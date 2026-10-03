import MyProductsModule from "@/components/modules/Admin/MyBusinessModule/MyProductsModule/MyProductsModule";
import React, { JSX } from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

async function Products(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.business_id || !session?.business_owner_id) {
    throw new Error(
      "Invalid or expired session: (business_id or business_owner_id) is missing."
    );
  }

  return <MyProductsModule session={session} />;
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
