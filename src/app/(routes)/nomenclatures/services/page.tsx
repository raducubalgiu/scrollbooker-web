import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import ServicesModule from "@/components/modules/Nomenclatures/ServicesModule/ServicesModule";

async function Services() {
	return <ServicesModule />;
}

export default ProtectedPage(Services, "NOMENCLATURES_VIEW");
