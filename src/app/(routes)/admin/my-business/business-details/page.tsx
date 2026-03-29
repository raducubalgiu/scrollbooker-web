import React from "react";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { get } from "@/utils/requests";
import MyBusinessDetailsModule from "@/components/modules/Admin/MyBusiness/LocationModule/MyBusinessDetailsModule";
import { Business } from "@/ts/models/booking/business/Business";

async function MyBusiness() {
  const { userId } = await getUserServerSession();

  const business = (
    await get<Business>({
      url: `/users/${userId}/businesses`,
    })
  ).data;

  return (
    <MainLayout title="Detalii Business" hideAction>
      <MyBusinessDetailsModule business={business} />
    </MainLayout>
  );
}

export default ProtectedPage(
  MyBusiness,
  PermissionEnum.MY_BUSINESS_LOCATION_VIEW
);
