import { PaginatedData } from "@/components/core/Table/Table";
import DashboardModule from "@/components/modules/DashboardModule/DashboardModule";
import { decodeToken } from "@/lib/auth/decodeToken";
import { ProductType } from "@/models/Product/ProductResponse";
import { get } from "@/utils/requests";
import { orderBy } from "lodash";

export default async function Home() {
	const { user_id } = await decodeToken();

	const response = (
		await get<PaginatedData<ProductType>>({
			url: `/users/${user_id}/products?page=1&limit=50`,
		})
	).data;

	const slotDuration = orderBy(response?.results, ["duration"], ["asc"])[0]
		?.duration;

	return (
		<DashboardModule userId={Number(user_id)} slotDuration={slotDuration} />
	);
}
