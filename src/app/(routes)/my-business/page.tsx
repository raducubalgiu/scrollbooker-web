import React from "react";
import MainLayout from "../../../components/cutomized/MainLayout/MainLayout";
import MyBusinessDetails from "@/components/modules/MyBusinessModule/MyBusinessDetails";
import MyBusinessServices from "@/components/modules/MyBusinessModule/MyBusinessServices";
import { decodeToken } from "@/lib/auth/decodeToken";
import { get } from "@/utils/requests";
import { ServiceType } from "@/models/nomenclatures/ServiceType";
import { some } from "lodash";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";

type BusinessType = {
	id: number;
	description: string;
	address: string;
	coordinates: [number, number];
	owner_id: number;
	business_type_id: number;
	services: ServiceType[];
};

async function MyBusiness() {
	const { user_id } = await decodeToken();

	const business = (
		await get<BusinessType>({
			url: `/users/${user_id}/business`,
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
				savedServices={business.services}
				services={servicesWithSelection}
				businessId={business.id}
			/>
		</MainLayout>
	);
}

export default ProtectedPage(MyBusiness, "MY_BUSINESS_VIEW");
