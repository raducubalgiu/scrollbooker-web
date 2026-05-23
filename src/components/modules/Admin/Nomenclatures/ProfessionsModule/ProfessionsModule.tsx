"use client";

import { PaginatedData } from "@/components/core/Table/Table";
import MainLayout from "../../../../cutomized/MainLayout/MainLayout";
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
import { Profession } from "@/ts/models/nomenclatures/profession/ProfessionType";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Delete, Edit } from "@mui/icons-material";
import { Button, Switch } from "@mui/material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import ProfessionModal from "./ProfessionModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Profession>;
  table: MRT_TableInstance<Profession>;
  closeMenu: () => void;
};

type ProfessionModalState = {
  open: boolean;
  data: Profession | null;
};

type ProfessionModuleProps = {
  initialData: PaginatedData<Profession>;
  businessDomains: BusinessDomain[];
  pageSize: number;
};

export default function ProfessionsModule({
  initialData,
  businessDomains,
  pageSize,
}: ProfessionModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [openModal, setOpenModal] = useState<ProfessionModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, isError, refetch } = useCustomQuery<
    PaginatedData<Profession>
  >({
    key: ["professions", pagination.pageIndex, pagination.pageSize],
    url: `/api/nomenclatures/professions?page=${pagination.pageIndex + 1}&limit=${pagination.pageSize}`,
    options: {
      ...(pagination.pageIndex === 0 && pagination.pageSize === 5
        ? { initialData }
        : {}),
    },
  });

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-profession"],
    url: "/api/nomenclatures/professions",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const columns = useMemo<MRT_ColumnDef<Profession>[]>(
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
        accessorKey: "active",
        header: "Active",
        Cell: ({ row }) => (
          <Switch checked={row.original.active} disabled={true} />
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created_at",
        enableEditing: false,
      },
    ],
    []
  );

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
          handleDelete({ professionId: row.original.id });

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
  });

  return (
    <MainLayout title="Profesii" hideAction>
      <ProfessionModal
        open={openModal.open}
        data={openModal.data}
        businessDomains={businessDomains}
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
