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

  if (!session?.business_owner_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (business_id) lipsește."
    );
  }

  const response = await get<BusinessEmployee[]>({
    url: `/businesses/owner/${session?.business_owner_id}/employees`,
  });

  const employeesData = response.data;

  if (!employeesData) {
    throw new Error("An error occured when fetching business employees");
  }

  return <MyProductsModule session={session} employees={employeesData} />;
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
