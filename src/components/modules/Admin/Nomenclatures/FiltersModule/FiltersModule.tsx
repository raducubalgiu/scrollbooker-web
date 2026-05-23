"use client";

import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
import { PaginatedData } from "@/components/core/Table/Table";

import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { useCallback, useMemo, useState } from "react";
import { Button, Checkbox } from "@mui/material";
import { filterTypefromKey } from "@/ts/enums/FilterTypeEnum";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import FiltersModal from "./FiltersModal";
import SubFiltersModule from "./SubFiltersModule";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Filter>;
  table: MRT_TableInstance<Filter>;
  closeMenu: () => void;
};

type FilterModalState = {
  open: boolean;
  data: Filter | null;
};

type FilterModuleProps = {
  initialData: PaginatedData<Filter>;
  pageSize: number;
};

export default function FiltersModule({
  initialData,
  pageSize,
}: FilterModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [openModal, setOpenModal] = useState<FilterModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, isError, refetch } = useCustomQuery<
    PaginatedData<Filter>
  >({
    key: ["filters", pagination.pageIndex, pagination.pageSize],
    url: `/api/nomenclatures/filters?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === pageSize
        ? { initialData }
        : {}),
    },
  });

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-filter"],
    url: "/api/nomenclatures/filters",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: RenderRowActionMenuItemsProps) => [
      <MRT_ActionMenuItem
        key={0}
        label="Editeaza"
        icon={<Edit />}
        onClick={() => {
          setOpenModal({
            open: true,
            data: row.original,
          });

          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={1}
        label="Șterge"
        icon={<Delete />}
        onClick={() => {
          handleDelete({ filterId: row.original.id });

          closeMenu();
        }}
        table={table}
      />,
    ],
    []
  );

  const renderTopToolbarCustomActions = useCallback(
    () => (
      <Button
        onClick={() => {
          setOpenModal({
            open: true,
            data: null,
          });
        }}
        variant="contained"
        disableElevation
      >
        Adaugă
      </Button>
    ),
    []
  );

  const columns = useMemo<MRT_ColumnDef<Filter>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
        enableEditing: false,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "type",
        header: "Tip",
        Cell: ({ row }) => filterTypefromKey(row.original.type)?.toUpperCase(),
      },
      {
        accessorKey: "single_select",
        header: "Single Select",
        Cell: ({ row }) => (
          <Checkbox checked={row.original.single_select} disabled={true} />
        ),
      },
      {
        accessorKey: "active",
        header: "Activ",
        Cell: ({ row }) => (
          <Checkbox checked={row.original.active} disabled={true} />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
      {
        accessorKey: "updated_at",
        header: "Updated_at",
        enableEditing: false,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
    rowCount: totalCount,

    enablePagination: true,
    manualPagination: true,

    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableRowActions: true,
    enableTopToolbar: true,
    renderRowActionMenuItems,
    renderTopToolbarCustomActions,
    positionActionsColumn: "last",
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.paper,
    }),
    localization: MRT_Localization_RO,
    state: {
      pagination,
      isLoading: !tableData.length || isLoading || isPendingDelete,
      showAlertBanner: isError,
    },

    onPaginationChange: setPagination,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    },
    renderDetailPanel: ({ row }) => {
      return <SubFiltersModule subFilters={row.original.sub_filters} />;
    },
  });

  return (
    <MainLayout title="Filtre" hideAction>
      <FiltersModal
        open={openModal.open}
        data={openModal.data}
        onClose={() => setOpenModal({ open: false, data: null })}
        onSuccess={() => {
          refetch();
          setOpenModal({ open: false, data: null });
        }}
      />
      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
