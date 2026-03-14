import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { MyServicesModule } from "@/components/modules/MyBusiness/MyServicesModule/MyServicesModule";

async function Services() {
  return <MyServicesModule />;
}

export default ProtectedPage(Services, "MY_SERVICES_VIEW");
