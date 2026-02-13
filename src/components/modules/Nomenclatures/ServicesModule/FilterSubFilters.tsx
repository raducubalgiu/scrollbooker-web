import React, { memo, useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import Table from "@/components/core/Table/Table";
import { FilterSubfilterType } from "@/ts/models/nomenclatures/service/ServiceType";

type FilterSubFiltersType = {
  sub_filters: FilterSubfilterType[] | undefined;
};

const FilterSubFilters = ({ sub_filters }: FilterSubFiltersType) => {
  const columns = useMemo<MRT_ColumnDef<FilterSubfilterType>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 300,
      },
    ],
    []
  );

  return (
    <Table<FilterSubfilterType>
      data={sub_filters}
      columns={columns}
      manualPagination={false}
      enablePagination={false}
      enableColumnFilters={false}
      enableSorting={false}
      topToolbarIconButton
      enableFilters={false}
      enableColumnActions={false}
      enableEditing={false}
      enableTopToolbar={false}
      muiTableHeadCellProps={{ sx: { bgcolor: "background.default" } }}
    />
  );
};

export default memo(FilterSubFilters);
