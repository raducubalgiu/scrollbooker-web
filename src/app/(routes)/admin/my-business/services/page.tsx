import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { MyServicesModule } from "@/components/modules/Admin/MyBusiness/MyServicesModule/MyServicesModule";
import { authOptions } from "@/lib/auth/authOptions";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";

async function Services() {
  const session = await getServerSession(authOptions);

  if (!session?.business_id) {
    throw new Error(
      "Sesiune invalidă sau expirată: Identificatorul utilizatorului (business_id) lipsește."
    );
  }

  const response = await get<SelectedServiceDomainWithServices[]>({
    url: `/businesses/${session.business_id}/service-domains`,
  });

  const businessServices = response?.data;

  if (!businessServices) {
    throw new Error("An error occured when fetching business services");
  }

  return <MyServicesModule initialServices={businessServices} />;
}

export default ProtectedPage(Services, "MY_SERVICES_VIEW");
