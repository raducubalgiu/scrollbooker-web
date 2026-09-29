"use client";

import { useState, useMemo, useCallback } from "react";
import { Button, Switch } from "@mui/material";
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
import {
  Profession,
  ProfessionCreateOrUpdate,
} from "@/ts/models/nomenclatures/profession/ProfessionType";
import { BusinessDomain } from "@/ts/models/nomenclatures/businessDomain/BusinessDomain";
import {
  useAllProfessions,
  useCreateProfession,
  useDeleteProfession,
  useUpdateProfession,
} from "@/controllers/nomenclature/professions.controller";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import ProfessionModal from "./ProfessionModal";
import ConfirmationModal from "@/components/cutomized/ConfirmationModal/ConfirmationModal";

type RenderRowActionMenuItemsProps = {
  row: MRT_Row<Profession>;
  table: MRT_TableInstance<Profession>;
  closeMenu: () => void;
};

type ProfessionModalState = {
  open: boolean;
  data: Profession | null;
};

type DeleteModalState = {
  open: boolean;
  id: string | null;
  name: string;
};

type ProfessionModuleProps = {
  businessDomains: BusinessDomain[];
};

export default function ProfessionsModule({
  businessDomains,
}: ProfessionModuleProps) {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [openModal, setOpenModal] = useState<ProfessionModalState>({
    open: false,
    data: null,
  });

  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    open: false,
    id: null,
    name: "",
  });

  const { data, isLoading, isError } = useAllProfessions({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    all: true,
  });

  const { mutate: createProfession, isPending: isPendingCreate } =
    useCreateProfession();
  const { mutate: updateProfession, isPending: isPendingUpdate } =
    useUpdateProfession();
  const { mutate: deleteProfession, isPending: isPendingDelete } =
    useDeleteProfession();

  const tableData = useMemo(() => data?.results || [], [data]);
  const totalCount = useMemo(() => data?.count ?? 0, [data]);

  const handleCloseModal = () => setOpenModal({ open: false, data: null });
  const handleCloseDeleteModal = () =>
    setDeleteModal({ open: false, id: null, name: "" });

  const handleSaveProfession = (formData: ProfessionCreateOrUpdate) => {
    const isEditMode = !!openModal.data;

    if (isEditMode && openModal.data) {
      updateProfession(
        { id: String(openModal.data.id), data: formData },
        {
          onSuccess: () => {
            toast.success("Profesia a fost modificată cu succes!");
            handleCloseModal();
          },
          onError: () => toast.error("Eroare la modificarea profesiei."),
        }
      );
    } else {
      createProfession(formData, {
        onSuccess: () => {
          toast.success("Profesia a fost adăugată cu succes!");
          handleCloseModal();
        },
        onError: () => toast.error("Eroare la adăugarea profesiei."),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteModal.id) return;

    deleteProfession(deleteModal.id, {
      onSuccess: () => {
        toast.success("Profesia a fost ștearsă cu succes!");
        handleCloseDeleteModal();
      },
      onError: () => toast.error("A apărut o eroare la ștergerea profesiei."),
    });
  };

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
        onClose={handleCloseModal}
        onSave={handleSaveProfession}
        isSubmitting={isPendingCreate || isPendingUpdate}
      />

      <ConfirmationModal
        title="Confirmă ștergerea"
        primaryActionTitle="Șterge"
        message={`Sigur dorești să ștergi profesia "${deleteModal.name}"?`}
        open={deleteModal.open}
        isLoading={isPendingDelete}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      <MaterialReactTable table={table} />
    </MainLayout>
  );
}
