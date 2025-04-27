import DashboardModule from "@/components/modules/DashboardModule/DashboardModule";
import { decodeToken } from "@/lib/auth/decodeToken";

export default async function Home() {
	const { user_id } = await decodeToken();

	return <DashboardModule userId={Number(user_id)} />;
}
