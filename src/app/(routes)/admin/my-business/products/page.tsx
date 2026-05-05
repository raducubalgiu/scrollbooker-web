import MyProductsModule from "@/components/modules/Admin/MyBusiness/MyProductsModule/MyProductsModule";
import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { get } from "@/utils/requests";
import { authOptions } from "@/lib/auth/authOptions";

async function Products() {
  const session = await getServerSession(authOptions);

  try {
    const response = await get<BusinessEmployee[]>({
      url: `/businesses/owner/${session?.business_owner_id}/employees`,
    });

    return <MyProductsModule session={session} employees={response.data} />;
  } catch (error) {
    throw new Error("Eroare la comunicarea cu serverul.");
  }
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
