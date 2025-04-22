import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import FiltersModule from "@/components/modules/Nomenclatures/FiltersModule/FiltersModule";
import React from "react";

async function Filters() {
	return <FiltersModule />;
}

export default ProtectedPage(Filters, "NOMENCLATURES_VIEW");
