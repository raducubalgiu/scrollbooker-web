"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { Consent } from "@/ts/models/nomenclatures/consent/Consent";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MRT_Row,
  MRT_TableInstance,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { useCallback, useMemo, useState } from "react";
import ConsentModal from "./ConsentModal";

type ConsentsModuleProps = {
  initialData: Consent[];
};

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Consent>;
  table: MRT_TableInstance<Consent>;
  closeMenu: () => void;
};

type ConsentModalState = {
  open: boolean;
  data: Consent | null;
};

const ConsentsModule = ({ initialData }: ConsentsModuleProps) => {
  const [openModal, setOpenModal] = useState<ConsentModalState>({
    open: false,
    data: null,
  });

  const { data, isLoading, refetch } = useCustomQuery<Consent[]>({
    key: ["consents"],
    url: "/api/nomenclatures/consents",
    options: {
      initialData: initialData ?? [],
    },
  });

  const memoizedData = useMemo(() => {
    return data || [];
  }, [data]);

  const { mutate: handleDelete, isPending: isPendingDelete } = useMutate({
    key: ["delete-consent"],
    url: "/api/nomenclatures/consents",
    method: "DELETE",
    options: {
      onSuccess: () => refetch(),
    },
  });

  const columns = useMemo<MRT_ColumnDef<Consent>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableEditing: false,
        size: 10,
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "text",
        header: "Text",
        Cell: ({ cell }) => (
          <Box
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              fontSize: "0.85rem",
              lineHeight: "1.4",
            }}
            title={cell.getValue<string>()}
          >
            {cell.getValue<string>()}
          </Box>
        ),
      },
      {
        accessorKey: "created_at",
        header: "Created At",
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
          handleDelete({ consentId: row.original.id });

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
    <MainLayout title="Formulare de consimtamant" hideAction>
      <ConsentModal
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
};

export default ConsentsModule;
