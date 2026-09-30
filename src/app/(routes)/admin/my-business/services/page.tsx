import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { MyServicesModule } from "@/components/modules/Admin/MyBusiness/MyServicesModule/MyServicesModule";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { JSX } from "react";

async function Services(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);

  if (!session?.business_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (business_id) lipsește."
    );
  }

  return <MyServicesModule session={session} />;
}

export default ProtectedPage(Services, "MY_SERVICES_VIEW");
