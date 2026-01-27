import React from "react";
import { get } from "@/utils/requests";
import { some } from "lodash";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { UserBusinessType } from "@/ts/models/UserBusiness/UserBusinessType";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";

async function MyBusiness() {
  const { userId } = await getUserServerSession();

  //   const business = (
  //     await get<UserBusinessType>({
  //       url: `/users/${userId}/business`,
  //     })
  //   ).data;

  //   console.log("BUSINESS!!!", business);

  //   const allServices = (
  //     await get<ServiceType[]>({
  //       url: `/business-types/${business.business_type_id}/services`,
  //     })
  //   ).data;

  //   console.log("ALL SERVICES!!!", allServices);

  //   const servicesWithSelection = allServices.map((service) => {
  //     return {
  //       ...service,
  //       isSelected: some(business.services, { id: service.id }),
  //     };
  //   });

  //   console.log("ALL SERVICES WITH SELECTION!!!", servicesWithSelection);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    //setValue(newValue);
  };

  return (
    <MainLayout title="Afacerea mea" hideAction>
      <Typography>Hello</Typography>
      <Tabs
        value={0}
        onChange={() => {}}
        aria-label="wrapped label tabs example"
      >
        <Tab
          value="one"
          label="New Arrivals in the Longest Text of Nonfiction that should appear in the next line"
          wrapped
        />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
      {/* <MyBusinessDetails
				description={business.description}
				address={business.address}
				coordinates={business.coordinates}
			/>
			<MyBusinessServices
				savedServices={business?.services ?? []}
				services={servicesWithSelection ?? []}
				businessId={business.id}
			/> */}
    </MainLayout>
  );
}

export default ProtectedPage(
  MyBusiness,
  PermissionEnum.MY_BUSINESS_LOCATION_VIEW
);
