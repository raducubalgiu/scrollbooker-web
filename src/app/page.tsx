import DashboardModule from "@/components/modules/DashboardModule/DashboardModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export default async function Home() {
  const { userId } = await getUserServerSession();

  return <DashboardModule userId={userId} />;
}
