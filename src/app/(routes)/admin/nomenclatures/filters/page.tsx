import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import FiltersModule from "@/components/modules/Admin/Nomenclatures/FiltersModule/FiltersModule";

async function Filters() {
  return <FiltersModule />;
}

export default ProtectedPage(Filters, "NOMENCLATURES_VIEW");
