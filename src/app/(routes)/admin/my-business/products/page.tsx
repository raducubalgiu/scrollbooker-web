import MyProductsModule from "@/components/modules/Admin/MyBusiness/MyProductsModule/MyProductsModule";
import React, { JSX } from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { getServerSession } from "next-auth";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import { get } from "@/utils/requests";
import { authOptions } from "@/lib/auth/authOptions";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";

async function Products(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.business_id || !session?.business_owner_id) {
    throw new Error(
      "Invalid or expired session: (business_id or business_owner_id) is missing."
    );
  }

  const [{ data: employees }, { data: serviceDomainServices }] =
    await Promise.all([
      get<BusinessEmployee[]>({
        url: `/businesses/owner/${session?.business_owner_id}/employees`,
      }),

      get<SelectedServiceDomainWithServices[]>({
        url: `/businesses/${session?.business_id}/service-domains`,
      }),
    ]);

  const defaultEmployeeId = session.is_employee ? session.user_id : null;

  return (
    <MyProductsModule
      session={session}
      employees={employees}
      serviceDomainServices={serviceDomainServices}
      defaultEmployeeId={defaultEmployeeId}
    />
  );
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
