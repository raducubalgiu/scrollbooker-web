import MyDashboardModule from "@/components/modules/MyBusiness/MyDashboardModule/MyDashboardModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export default async function Dashboard() {
  const { userId } = await getUserServerSession();

  return <MyDashboardModule userId={userId} />;
}
