"use client";

import { useState, useMemo, useCallback } from "react";
import { Button, Checkbox } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_PaginationState,
  MRT_ActionMenuItem,
} from "material-react-table";
import { MRT_Localization_RO } from "material-react-table/locales/ro";
import { toast } from "react-toastify";
import FiltersModal from "./FiltersModal";
import {
  Filter,
  FilterCreateOrUpdate,
} from "@/ts/models/nomenclatures/filter/FilterType";
import {
  useAllFilters,
  useCreateFilter,
  useDeleteFilter,
  useUpdateFilter,
} from "@/controllers/nomenclature/filter.controller";
import SubFiltersModule from "./SubFiltersModule";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Filter>;
  table: MRT_TableInstance<Filter>;
  closeMenu: () => void;
};

type FilterModalState = {
  open: boolean;
  data: Filter | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

export default function FiltersModule() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openModal, setOpenModal] = useState<FilterModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading, isError } = useAllFilters({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const { mutate: createFilter, isPending: isPendingCreate } =
    useCreateFilter();
  const { mutate: updateFilter, isPending: isPendingUpdate } =
    useUpdateFilter();
  const { mutate: deleteFilter, isPending: isPendingDelete } =
    useDeleteFilter();

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveFilter = (formData: FilterCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateFilter(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Filtrul a fost modificat cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea filtrului."),
        }
      );
    } else {
      createFilter(formData, {
        onSuccess: () => {
          toast.success("Filtrul a fost adăugat cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea filtrului."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteFilter(deleteModal.id, {
      onSuccess: () => {
        toast.success("Filtrul a fost șters cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => {
        toast.error("A apărut o eroare la ștergerea filtrului.");
      },
    });
  };

  const columns = useMemo<MRT_ColumnDef<Filter>[]>(
    () => [
      { accessorKey: "id", header: "ID", size: 50, enableEditing: false },
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "single_select",
        header: "Single Select",
        Cell: ({ row }) => (
          <Checkbox checked={row.original.single_select} disabled />
        ),
      },
      {
        accessorKey: "active",
        header: "Activ",
        Cell: ({ row }) => <Checkbox checked={row.original.active} disabled />,
      },
      { accessorKey: "created_at", header: "Created_at", enableEditing: false },
      { accessorKey: "updated_at", header: "Updated_at", enableEditing: false },
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
    localization: MRT_Localization_RO,
    state: {
      pagination,
      isLoading: !tableData.length || isLoading,
      showLoadingOverlay: isPendingDelete,
      showAlertBanner: isError,
    },
    onPaginationChange: setPagination,
    muiTablePaperProps: {
      elevation: 0,
      sx: { borderRadius: 2.5, border: "1px solid", borderColor: "divider" },
    },
    renderDetailPanel: ({ row }) => (
      <SubFiltersModule subFilters={row.original.sub_filters} />
    ),
  });

  return (
    <MainLayout title="Filtre" hideAction>
      <FiltersModal
        open={openModal.open}
        data={openModal.data}
        onClose={handleCloseModal}
        onSave={handleSaveFilter}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi filtrul "${deleteModal.name}"? Această acțiune este ireversibilă.`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
