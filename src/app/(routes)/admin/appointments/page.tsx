import AppointmentsModule from "@/components/modules/Admin/AppointmentsModule/AppointmentsModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";

export default async function Appointments() {
  const session = await getUserServerSession();

  return <AppointmentsModule session={session.session} />;
}
