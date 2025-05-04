import React from "react";
import MainLayout from "../../../components/cutomized/MainLayout/MainLayout";
import MyBusinessDetails from "@/components/modules/MyBusinessModule/MyBusinessDetails";
import MyBusinessServices from "@/components/modules/MyBusinessModule/MyBusinessServices";
import { get } from "@/utils/requests";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { some } from "lodash";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { UserBusinessType } from "@/models/UserBusiness/UserBusinessType";

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

export default ProtectedPage(MyBusiness, "MY_BUSINESS_VIEW");
