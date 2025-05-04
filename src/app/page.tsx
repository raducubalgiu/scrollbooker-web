import DashboardModule from "@/components/modules/DashboardModule/DashboardModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { get } from "@/utils/requests";
import { max } from "lodash";

export default async function Home() {
	const { userId } = await getUserServerSession();

	const response = (
		await get<number[]>({
			url: `/users/${userId}/product-durations`,
		})
	).data;

	return <DashboardModule userId={userId} slotDuration={max(response)} />;
}
