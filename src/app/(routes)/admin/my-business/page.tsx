import MyBusinessModule from "@/components/modules/Admin/MyBusinessModule/MyBusinessModule";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";

export default async function MyBusinessPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Session is missing");
  }

  return <MyBusinessModule session={session} />;
}
