import { PaginatedData } from "@/components/core/Table/Table";
import { ProtectedPage } from "@/components/cutomized/Protected/ProtectedPage";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";
import { get } from "@/utils/requests";
import dynamic from "next/dynamic";
import React, { JSX } from "react";

const PAGE_SIZE = 10;

const FiltersModule = dynamic(
  () =>
    import(
      "@/components/modules/Admin/Nomenclatures/FiltersModule/FiltersModule"
    )
);

async function Filters(): Promise<JSX.Element> {
  const response = (
    await get<PaginatedData<Filter> | undefined>({
      url: `/filters?page=1&limit=${PAGE_SIZE}`,
    })
  ).data;

  if (!response) {
    throw new Error("An error occured when fetching filters");
  }

  return <FiltersModule initialData={response} pageSize={PAGE_SIZE} />;
}

export default ProtectedPage(Filters, "NOMENCLATURES_VIEW");
