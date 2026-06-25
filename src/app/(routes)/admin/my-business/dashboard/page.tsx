import MyDashboardModule from "@/components/modules/Admin/MyBusiness/MyDashboardModule/MyDashboardModule";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { JSX } from "react";

export default async function Dashboard(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  return <MyDashboardModule userId={session?.user_id} />;
}
