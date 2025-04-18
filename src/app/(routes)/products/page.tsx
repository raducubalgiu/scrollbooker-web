import ProductsModule from "@/components/modules/ProductsModule/ProductsModule";
import React from "react";
import { get } from "@/utils/requests";
import { decodeToken } from "@/lib/auth/decodeToken";
import { FilterType } from "@/models/nomenclatures/FilterType";
import { UserBusinessType } from "@/models/UserBusiness/UserBusinessType";

export default async function Products() {
	const { user_id } = await decodeToken();

	const business = (
		await get<UserBusinessType>({
			url: `/users/${user_id}/business`,
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
			available_filters={available_filters}
			business_id={business.id}
		/>
	);
}
