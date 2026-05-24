import React, { memo, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { SubFilter } from "@/ts/models/nomenclatures/subFilter/SubFilter";

type FilterSubFiltersProps = {
  sub_filters: SubFilter[] | undefined;
};

const FilterSubFilters = ({ sub_filters }: FilterSubFiltersProps) => {
  const memoizedData = useMemo(() => {
    return sub_filters || [];
  }, [sub_filters]);

  const columns = useMemo<MRT_ColumnDef<SubFilter>[]>(
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

  const table = useMaterialReactTable({
    columns,
    data: memoizedData,

    enablePagination: true,
    manualPagination: true,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    positionActionsColumn: "last",
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default memo(FilterSubFilters);
