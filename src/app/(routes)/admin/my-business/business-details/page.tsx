import React, { JSX } from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { get } from "@/utils/requests";
import MyBusinessDetailsModule from "@/components/modules/Admin/MyBusiness/MyBusinessDetailsModule/MyBusinessDetailsModule";
import { Business } from "@/ts/models/booking/business/Business";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

async function MyBusiness(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.user_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (user_id) lipsește."
    );
  }

  const response = await get<Business>({
    url: `/users/${session.user_id}/businesses`,
  });

  const businessData = response?.data;

  if (!businessData) {
    throw new Error("An error occured when fetching business data");
  }

  return <MyBusinessDetailsModule business={businessData} />;
}

export default ProtectedPage(
  MyBusiness,
  PermissionEnum.MY_BUSINESS_LOCATION_VIEW
);
