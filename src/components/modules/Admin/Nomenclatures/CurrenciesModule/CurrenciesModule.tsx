"use client";

import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import {
  Currency,
  CurrencyCreateOrUpdate,
} from "@/ts/models/nomenclatures/currency/Currency";
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
import { Delete, Edit } from "@mui/icons-material";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import CurrencyModal from "./CurrencyModal";
import {
  useAllCurrencies,
  useCreateCurrency,
  useDeleteCurrency,
  useUpdateCurrency,
} from "@/controllers/nomenclature/currency.controller";
import { toast } from "react-toastify";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Currency>;
  table: MRT_TableInstance<Currency>;
  closeMenu: () => void;
};

type CurrencyModalState = {
  open: boolean;
  data: Currency | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

export default function CurrenciesModule() {
  const [openModal, setOpenModal] = useState<CurrencyModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading } = useAllCurrencies({
    page: 1,
    limit: 100,
  });

  const { mutate: createCurrency, isPending: isPendingCreate } =
    useCreateCurrency();
  const { mutate: updateCurrency, isPending: isPendingUpdate } =
    useUpdateCurrency();
  const { mutate: deleteCurrency, isPending: isPendingDelete } =
    useDeleteCurrency();

  const memoizedData = useMemo(() => data?.results || [], [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveCurrency = (formData: CurrencyCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateCurrency(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Moneda a fost modificată cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea monedei."),
        }
      );
    } else {
      createCurrency(formData, {
        onSuccess: () => {
          toast.success("Moneda a fost adăugată cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea monedei."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteCurrency(deleteModal.id, {
      onSuccess: () => {
        toast.success("Moneda a fost ștearsă cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => {
        toast.error("A apărut o eroare la ștergerea monedei.");
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<Currency>[]>(
    () => [
      { accessorKey: "id", header: "ID", enableEditing: false, size: 50 },
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "active",
        header: "Active",
        Cell: ({ row }) => <Switch checked={row.original.active} disabled />,
      },
      { accessorKey: "created_at", enableEditing: false, header: "Created_at" },
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
          setOpenModal({ open: true, data: row.original });
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        key={1}
        label="Șterge"
        icon={<Delete />}
        onClick={() => {
          setDeleteModal({
            open: true,
            id: String(row.original.id),
            name: row.original.name,
          });
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
        onClick={() => setOpenModal({ open: true, data: null })}
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
    localization: MRT_Localization_RO,
    state: {
      isLoading,
      showLoadingOverlay: isPendingDelete,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: 2.5, border: "1px solid", borderColor: "divider" },
    },
  });

  return (
    <MainLayout title="Monede" hideAction>
      <CurrencyModal
        open={openModal.open}
        data={openModal.data}
        onClose={handleCloseModal}
        onSave={handleSaveCurrency}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi moneda "${deleteModal.name}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
