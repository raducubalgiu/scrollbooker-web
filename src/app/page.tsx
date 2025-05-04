import { PaginatedData } from "@/components/core/Table/Table";
import DashboardModule from "@/components/modules/DashboardModule/DashboardModule";
import { ProductType } from "@/models/Product/ProductResponse";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { get } from "@/utils/requests";
import { orderBy } from "lodash";

export default async function Home() {
	const { userId } = await getUserServerSession();

	const response = (
		await get<PaginatedData<ProductType>>({
			url: `/users/${userId}/products?page=1&limit=50`,
		})
	).data;

	const slotDuration = orderBy(response?.results, ["duration"], ["asc"])[0]
		?.duration;

	return <DashboardModule userId={userId} slotDuration={slotDuration} />;
}
