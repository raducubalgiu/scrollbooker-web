"use client";

import React, { useCallback, useMemo } from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export type CustomTableRowActionProps<T extends MRT_RowData> = {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  closeMenu: () => void;
};

type CustomTableProps<T extends MRT_RowData> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  onAdd?: () => void;
  addButtonLabel?: string;
  onEdit?: (row: MRT_Row<T>) => void;
  editLabel?: string;
  onDelete?: (row: MRT_Row<T>) => void;
  deleteLabel?: string;
  extraRowActions?: (
    props: CustomTableRowActionProps<T>
  ) => React.ReactNode[];
  extraToolbarActions?: React.ReactNode;
} & Omit<
  Partial<MRT_TableOptions<T>>,
  "columns" | "data" | "renderRowActionMenuItems" | "renderTopToolbarCustomActions"
>;

export default function CustomTable<T extends MRT_RowData>({
  columns,
  data,
  onAdd,
  addButtonLabel = "Adaugă",
  onEdit,
  editLabel = "Editează",
  onDelete,
  deleteLabel = "Șterge",
  extraRowActions,
  extraToolbarActions,
  ...rest
}: CustomTableProps<T>) {
  const hasRowActions = Boolean(onEdit || onDelete || extraRowActions);
  const hasToolbarActions = Boolean(onAdd || extraToolbarActions);

  const renderRowActionMenuItems = useCallback(
    ({ row, table, closeMenu }: CustomTableRowActionProps<T>) => {
      const items: React.ReactNode[] = [];

      if (onEdit) {
        items.push(
          <MRT_ActionMenuItem
            key="edit"
            label={editLabel}
            icon={<Edit />}
            onClick={() => {
              onEdit(row);
              closeMenu();
            }}
            table={table}
          />
        );
      }

      if (onDelete) {
        items.push(
          <MRT_ActionMenuItem
            key="delete"
            label={deleteLabel}
            icon={<Delete />}
            onClick={() => {
              onDelete(row);
              closeMenu();
            }}
            table={table}
          />
        );
      }

      if (extraRowActions) {
        items.push(...extraRowActions({ row, table, closeMenu }));
      }

      return items;
    },
    [onEdit, editLabel, onDelete, deleteLabel, extraRowActions]
  );

  const renderTopToolbarCustomActions = useCallback(
    () => (
      <>
        {onAdd && (
          <Button onClick={onAdd} variant="contained" disableElevation>
            {addButtonLabel}
          </Button>
        )}
        {extraToolbarActions}
      </>
    ),
    [onAdd, addButtonLabel, extraToolbarActions]
  );

  const muiTablePaperProps = useMemo(
    () => ({
      elevation: 0,
      sx: {
        borderRadius: 2.5,
        border: "1px solid",
        borderColor: "divider",
      },
    }),
    []
  );

  const table = useMaterialReactTable<T>({
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    enableTopToolbar: true,
    positionActionsColumn: "last",
    localization: MRT_Localization_RO,
    muiTablePaperProps,
    ...rest,
    columns,
    data,
    enableRowActions: rest.enableRowActions ?? hasRowActions,
    ...(hasRowActions ? { renderRowActionMenuItems } : {}),
    ...(hasToolbarActions ? { renderTopToolbarCustomActions } : {}),
  });

  return <MaterialReactTable table={table} />;
}
