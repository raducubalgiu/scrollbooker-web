"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Currency } from "@/ts/models/nomenclatures/currency/Currency";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Switch } from "@mui/material";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import CurrencyModal from "./CurrencyModal";

type CurrenciesModuleProps = {
  initialData: Currency[];
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Currency>;
  table: MRT_TableInstance<Currency>;
  closeMenu: () => void;
};

type CurrencyModalState = {
  open: boolean;
  data: Currency | null;
};

export default function CurrenciesModule({
  initialData,
}: CurrenciesModuleProps) {
  const [openModal, setOpenModal] = useState<CurrencyModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, refetch } = useCustomQuery<Currency[]>({
    key: ["currencies"],
    url: "/api/nomenclatures/currencies",
    options: {
      initialData: initialData ?? [],
    },
  });

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-currency"],
    url: "/api/nomenclatures/currencies",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const columns = useMemo<MRT_ColumnDef<Currency>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 50,
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
        enableEditing: false,
        header: "Created_at",
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
          handleDelete({ currencyId: row.original.id });

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
    data: memoizedData,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
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
      isLoading,
      showLoadingOverlay: isPendingDelete,
    },
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
    <MainLayout title="Monede" hideAction>
      <CurrencyModal
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
