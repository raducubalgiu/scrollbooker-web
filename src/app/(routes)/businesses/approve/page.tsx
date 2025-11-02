import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import UnapprovedBusinessModule from "@/components/modules/UnapprovedBusinessModule/UnapprovedBusinessModule";

async function ValidateBusiness() {
    return <UnapprovedBusinessModule />;
}

export default ProtectedPage(ValidateBusiness, "NOMENCLATURES_VIEW");