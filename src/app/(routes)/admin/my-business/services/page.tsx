import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { MyServicesModule } from "@/components/modules/Admin/MyBusiness/MyServicesModule/MyServicesModule";
import { authOptions } from "@/lib/auth/authOptions";
import { SelectedServiceDomainWithServices } from "@/ts/models/nomenclatures/serviceDomain/SelectedServiceDomainWithServices";
import { get } from "@/utils/requests";
import { getServerSession } from "next-auth";

async function Services() {
  const session = await getServerSession(authOptions);

  if (!session?.business_id) {
    throw Error("Business Id not provided");
  }

  try {
    const response = await get<SelectedServiceDomainWithServices[]>({
      url: `/businesses/${session.business_id}/service-domains`,
    });

    return <MyServicesModule initialServices={response?.data || []} />;
  } catch (error) {
    console.error("Failed to fetch service domains:", error);

    return <MyServicesModule initialServices={[]} />;
  }
}

export default ProtectedPage(Services, "MY_SERVICES_VIEW");
