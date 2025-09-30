import React from "react";
import MainLayout from "../../../components/cutomized/MainLayout/MainLayout";
import MyBusinessDetails from "@/components/modules/MyBusinessModule/MyBusinessDetails";
import MyBusinessServices from "@/components/modules/MyBusinessModule/MyBusinessServices";
import { get } from "@/utils/requests";
import { ServiceType } from "@/ts/models/nomenclatures/ServiceType";
import { some } from "lodash";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { UserBusinessType } from "@/ts/models/UserBusiness/UserBusinessType";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";

async function MyBusiness() {
	const { userId } = await getUserServerSession();

	const business = (
		await get<UserBusinessType>({
			url: `/users/${userId}/business`,
		})
	).data;

	const allServices = (
		await get<ServiceType[]>({
			url: `/business-types/${business.business_type_id}/services`,
		})
	).data;

	const servicesWithSelection = allServices.map(service => {
		return {
			...service,
			isSelected: some(business.services, { id: service.id }),
		};
	});

	return (
		<MainLayout title="Afacerea mea" hideAction>
			<MyBusinessDetails
				description={business.description}
				address={business.address}
				coordinates={business.coordinates}
			/>
			<MyBusinessServices
				savedServices={business?.services ?? []}
				services={servicesWithSelection ?? []}
				businessId={business.id}
			/>
		</MainLayout>
	);
}

export default ProtectedPage(MyBusiness, PermissionEnum.MY_BUSINESS_LOCATION_VIEW);
