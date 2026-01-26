import ProductsModule from "@/components/modules/MyBusiness/ProductsModule/ProductsModule";
import React from "react";
import { get } from "@/utils/requests";
import { FilterType } from "@/ts/models/nomenclatures/FilterType";
import { UserBusinessType } from "@/ts/models/UserBusiness/UserBusinessType";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { CurrencyType } from "@/ts/models/nomenclatures/CurrencyType";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

async function Products() {
  const { userId } = await getUserServerSession();

  const business = (
    await get<UserBusinessType>({
      url: `/users/${userId}/business`,
    })
  ).data;

  const currencies = (
    await get<CurrencyType[]>({
      url: `/users/${userId}/currencies`,
    })
  ).data;

  const available_filters = (
    await get<FilterType[]>({
      url: `/business-types/${business.business_type_id}/filters`,
    })
  ).data;

  const services = business.services ?? [];

  return (
    <ProductsModule
      services={services}
      currencies={currencies}
      available_filters={available_filters}
      business_id={business.id}
    />
  );
}

export default ProtectedPage(Products, PermissionEnum.MY_PRODUCTS_VIEW);
